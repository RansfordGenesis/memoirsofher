import { Memory } from "@/lib/schemas";
import { useFieldArray, useForm } from "react-hook-form";
import SingleFileInput from "../singleImagepicker";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {   Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from "../ui/select";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";


export default function MemoriesForm() {
  const form = useForm<Memory>({
      defaultValues: {
          imageUrl: "",
          name: "",
          tags: [],
          message: "",
      },
  });

  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ];
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const handleCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      append({ value });
    } else {
      const index = fields.findIndex((field) => field.value === value);
      if (index !== -1) {
        remove(index);
      }
    }
  };
  return (
      <Card className="p-5">
          <CardHeader>
              <CardTitle>Memory Form</CardTitle>
              <CardDescription>Fill out the details below</CardDescription>
          </CardHeader>
          <CardContent className="">
              <Form {...form}>
                  <div className="grid w-full  md:grid-cols-2 gap-10">
                   
                      <div className=" space-y-7">
                          <FormField
                              control={form.control}
                              name="name"
                              render={() => (
                                  <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                          <Input />
                                      </FormControl>
                                      <FormDescription />
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="message"
                              render={() => (
                                  <FormItem>
                                      <FormLabel>Message</FormLabel>
                                      <FormControl>
                                          <Textarea className="h-40" />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select fruits" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {fruits.map((fruit) => (
                    <div key={fruit.value} className="flex items-center space-x-2 p-2">
                      <Checkbox
                        checked={fields.some((field) => field.value === fruit.value)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(checked as boolean, fruit.value)
                        }
                      />
                      <span>{fruit.label}</span>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <div className="flex flex-wrap gap-2 mt-2">
            {fields.map((field, index) => (
              <Badge 
                key={field.id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => remove(index)}
              >
                {fruits.find(f => f.value === field.value)?.label}
                <span className="ml-1">×</span>
              </Badge>
            ))}
          </div>
          <FormDescription>Select multiple fruits using checkboxes</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
                      </div>

               
                      <div>
                          <Label className="text-white">Upload Flyer Image</Label>
                          <FormField
                              control={form.control}
                              name="imageUrl"
                              render={({ field, fieldState }) => (
                                  <SingleFileInput
                                      field={field}
                                      error={fieldState.error}
                                      onChange={(file, base64) => field.onChange(base64)}
                                  />
                              )}
                          />
                      </div>
                  </div>
              </Form>
          </CardContent>
      </Card>
  );
}

