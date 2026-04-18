import { Edit } from "lucide-react";
import Upload from "../../shared/Upload";

function WidgetPotentialCustomer() {
  return <div className="flex flex-col gap-4 bg-[#F7F7F7] rounded-xl pt-3 pb-6 px-2">
        <Upload
            imgSrc="/locationIcon.png"
            title="Shawarma Palace"
            text="456 Elm Street. (1 km zone)"
            btnLabel="Edit"
            btnOnClick={() => console.log('clicked')}
             btnLeftSection={<Edit size={16} />}
            btnClassName="text-[12px] text-[#151515]! bg-white font-medium"
          />

          <div className="px-3 flex gap-2 items-end justify-start">
            <h3 className="text-4xl font-semibold text-[#151515] font-inter">
             8,400
            </h3>
            <p className="text-sm font-semibold text-[#6C6C6C] pb-1">
              Potential customers
            </p>
          </div>
  </div>;
}

export default WidgetPotentialCustomer;
