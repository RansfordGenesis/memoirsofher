import { Input } from "@/components/ui/input";
import NavBar from "../components/shared/nav";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const ShareMemory = () => {
  const { ...form } = useFormik({
    initialValues: {
      name: "",
      title: "",
      message: "",
    },
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <div className="h-screen w-screen relative overflow-clip grid place-content-center ">
      <NavBar linkClass="hover:border-b-black text-black border-transparent" />
      <div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
        <div className="w-full h-full bg-white/[0.87] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
        <img
          src="/images/no-bg.png"
          alt="jojo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-black z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-5 gap-4 ">
        <p className="font-cursive font-extralight text-[2.4rem] lg:text-[5rem] text-center ">
          Share A Memory.
        </p>
        <div className="bg-white/95 rounded-lg p-4 lg:w-[30rem] w-full shadow-xl">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                Add Image
              </p>
              <Input
                type="file"
                placeholder="Attach an image"
                accept="image/*"
              />
            </div>
            {fields?.map((field) => {
              const id = field.id as keyof typeof form.initialValues;
              switch (field.type) {
                case "text":
                  return (
                    <div key={field.id}>
                      <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                        {field.label}
                      </p>
                      <Input
                        type="text"
                        value={form.values?.[id]}
                        id={field.id}
                        onChange={form.handleChange}
                      />
                    </div>
                  );
                case "textarea":
                  return (
                    <div key={field.id}>
                      <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                        {field.label}
                      </p>
                      <Textarea
                        placeholder="Share a memory about Jojo..."
                        rows={5}
                        value={form.values?.[id]}
                        id={field.id}
                        onChange={form.handleChange}
                      />
                    </div>
                  );

                // case "select":
                //   return (
                //     <div key={field.id}>
                //       <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                //         {field.label}
                //       </p>

                //       <Select>
                //         <SelectTrigger>
                //           <SelectValue placeholder={field.placeholder} />
                //         </SelectTrigger>
                //         <SelectContent>
                //           {field.options?.map((option) => (
                //             <SelectItem value={option}>{option}</SelectItem>
                //           ))}
                //         </SelectContent>
                //       </Select>
                //     </div>
                //   );
              }
            })}

            <button className="bg-black hover:bg-black/95 duration-700 text-white py-2 rounded-lg">
              Share Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const fields = [
  {
    type: "text",
    label: "Name (optional)",
    id: "name",
    placeholder: "e.g Sam",
  },
  {
    type: "text",
    label: "Title",
    id: "title",
    placeholder: "",
  },
  {
    type: "textarea",
    label: "Message",
    id: "message",
    placeholder: "",
  },
  {
    type: "select",
    multiselect: true,
    options: ["WGSHS", "COE"],
    id: "tag",
    placeholder: "Select",
    label: "How do you know Jojo?",
  },
];
export default ShareMemory;
