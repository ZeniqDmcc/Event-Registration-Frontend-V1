const CustomDropdown = ({ fieldName, options, selectedOption, onAddOption, onRemoveOption, onOptionChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [newOptionValue, setNewOptionValue] = useState(""); // State to manage the new option value

    const handleInputChange = (event) => {
      setNewOptionValue(event.target.value);
    };

    const handleAddButtonClick = () => {
      if (newOptionValue.trim() !== "") {
        onAddOption(fieldName, newOptionValue);
        setNewOptionValue(""); // Clear the input field after adding the option
      }
    };

    const handleOptionClick = (option) => {
      onOptionChange(fieldName, option);
      // setShowOptions(false);
    };


    return (
      <div className="relative">
        <div
          className={`w-full bg-white border border-gray-300 rounded-md cursor-pointer flex items-center justify-between px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 ${showOptions ? "rounded-t-md" : "rounded-md"
            }`}
          onClick={() => setShowOptions(!showOptions)}
        >
          {selectedOption ? selectedOption : "Select an option..."}
          <svg
            className="w-5 h-5 ml-2 text-gray-400 transform transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: showOptions ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {showOptions && (
          <div className="options-list border flex flex-col gap-1 py-2 px-1 rounded-b-md mt-0">
            {/* Display existing options */}
            {options.map((option, optionIndex) => (
              <div
                className={`flex items-center justify-between option px-2 py-2 hover:bg-[#f0f0f0] rounded ${selectedOption === option ? "bg-[#f0f0f0]" : ""
                  }`}
                key={optionIndex}
                onClick={() => handleOptionClick(option)}
              >
                <span className="option-label">{option}</span>
                <button
                  className="remove-button"
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent the dropdown from closing
                    onRemoveOption(fieldName, optionIndex);
                  }}
                >
                  <img width="20" src="/formfield/minus.svg" alt="Delete" />
                </button>
              </div>
            ))}

            {/* Input fields for adding/editing options */}
            <div className="add-option flex border rounded justify-between p-2">
              <input
                className="outline-none"
                type="text"
                placeholder="New option..."
                value={newOptionValue}
                onClick={(event) => event.stopPropagation()} // Prevent click event from propagating
                onChange={handleInputChange}
              />
              <button
                onClick={(event) => {
                  event.stopPropagation(); // Prevent the dropdown from closing
                  handleAddButtonClick();
                }}
              >
                <img width="20" src="/formfield/addfield.svg" alt="Add Option" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
