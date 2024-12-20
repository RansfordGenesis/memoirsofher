import { Input } from "@/components/ui/input";
import NavBar from "../components/shared/nav";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { supabaseClient } from "@/lib/supabase";
import React, { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().optional(),
  title: Yup.string().required(),
  message: Yup.string().required(),
  tags: Yup.string().optional(),
});
const ShareMemory = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [submiting, setSubmiting] = React.useState<boolean>(false);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const { ...form } = useFormik({
    initialValues: {
      name: "",
      title: "",
      message: "",
      tags: "",
    },
    validationSchema: ValidationSchema,
    validateOnMount: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSubmiting(true);
      const fileName = `public/memory-${uuidv4()}`;
      toast.promise(
        supabaseClient.storage
          .from("images")
          .upload(fileName, selectedFile as File)
          .then(async () => {
            const {
              data: { publicUrl },
            } = supabaseClient.storage.from("images").getPublicUrl(fileName);
            const { error } = await supabaseClient.from("memory").insert({
              ...values,
              imgUrl: publicUrl,
            });

            if (!error) {
              toast.success("Thank you for sharing a memory of Jojo🤍");
              form.resetForm();
              navigate("/memories");
            }

            setSubmiting(false);
          }),
        {
          loading: "Uploading your memory🤍",
        }
      );
    },
  });

  return (
    <div className="h-screen w-screen relative overflow-clip grid place-content-center ">
      <NavBar linkClass="hover:border-b-black text-black border-transparent" />
      <div className="w-full h-full absolute left-0 right-0 top-0 grid lg:place-content-center   z-0">
        <div className="w-full h-full bg-white/[0.87] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
        <img
          src="/images/no-bg.png"
          alt="jojo"
          className="w-full lg:h-full h-full object-contain "
        />
      </div>

      <div className="text-black z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-5 gap-4 ">
        <p className="font-cursive font-extralight text-[2.4rem] lg:text-[5rem] text-center ">
          Share A Memory.
        </p>
        <div className="lg:bg-white/80 bg-white/60 rounded-lg p-4 lg:w-[30rem] w-full shadow-xl">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                Add Image
              </p>
              <Input
                onChange={handleFileChange}
                type="file"
                placeholder="Attach an image"
                accept="image/*"
                className="bg-white"
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
                        className="bg-white"
                      />
                      <p className="font-thin text-[0.75rem] text-red-700">
                        {form.errors[id]}
                      </p>
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
                        className="bg-white"
                      />
                      <p className="font-thin text-[0.75rem] text-red-700">
                        {form.errors[id]}
                      </p>
                    </div>
                  );

                case "select":
                  return (
                    <div key={field.id}>
                      <p className="font-extralight text-black/60 text-[0.87rem] mb-2">
                        {field.label}
                      </p>

                      <Select
                        onValueChange={(value) => {
                          form.setFieldValue(id, value);
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.touched[id] && form.errors[id] && (
                        <p className="font-thin text-[0.75rem] text-red-700">
                          {form.errors[id]}
                        </p>
                      )}
                    </div>
                  );
              }
            })}

            <button
              disabled={submiting}
              className="bg-black disabled:bg-black/30 hover:bg-black/95 duration-700 text-white py-2 rounded-lg"
              onClick={() => {
                if (selectedFile == null) {
                  toast.error("Image is required");
                }
                form.handleSubmit();
              }}
            >
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
    options: [
      "Flowers_Gay",
      "WGHS_20",
      "COE_24",
      "Gey_Hey",
      "ACES",
      "GESA",
      "WinE",
      "New_Breed",
      "MSP",
      "KNUST",
      "Other",
    ],
    id: "tags",
    placeholder: "e.g. KNUST",
    label: "How do you know Jojo?",
  },
];
export default ShareMemory;
