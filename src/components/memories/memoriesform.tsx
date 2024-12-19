import { Memory } from "@/lib/schemas";
import { useForm } from "react-hook-form";
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


export default function MemoriesForm() {
  const form = useForm<Memory>({
      defaultValues: {
          imageUrl: "",
          name: "",
          tags: [],
          message: "",
      },
  });

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
                                  <FormItem>
                                      <FormLabel>Tags</FormLabel>
                                      <FormControl>
                                      <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                                      </FormControl>
                                      <FormDescription />
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>

                      {/* Right Column */}
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

/*
    <div>
    <Label className=" text-white">Upload Flyer Image</Label>
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
    </div>*/