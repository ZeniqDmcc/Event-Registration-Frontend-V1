"use client"
import CreateFormBox from '@/components/molecules/CreateFormBox'
import FormHover from '@/components/organism/Forms/formHover'
import { useEffect, useState } from 'react';
import CreateFormModal from "@/components/organism/Forms/FormsFormModal"

const ViewFormsData = () => {

    const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);

    let box = "w-[23%] h-[349px] rounded-[8px] shadow-secondary group hover:bg-gray-100"
    let singleBox = "w-[23%] ixb-flex-both flex-col gap-6 bg-bluebg h-[349px] rounded-[8px] shadow-secondary cursor-pointer"

        return (
            <div>
                <div className='flex justify-center flex-wrap gap-[32px] mt-[32px]'>
                {/* New event */}
                <CreateFormBox onClick={() => setIsCreateFormModalOpen(true)} />
                {/* Existence event */}
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
              </div>
              {isCreateFormModalOpen && <CreateFormModal onClose={() => setIsCreateFormModalOpen(false)} />}
            </div>
        )
}

export default ViewFormsData