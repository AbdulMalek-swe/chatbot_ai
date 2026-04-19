import Upload from "./Upload";

function MetaConnect() {
  return (
    <div>
    <Upload 
  imgSrc="/Meta.png" 
  title=" META ACCOUNT VALIDATION" 
  text="Connect Meta Account"
  btnLabel="Connect"
  className="w-md!"
  btnClassName="text-[10px] font-normal! py-2.5! px-4!"
  btnOnClick={() => console.log('clicked')}
/>
    </div>
  );
}

export default MetaConnect;
