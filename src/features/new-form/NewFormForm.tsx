"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  validationCurrentJobTitle,
  validationFullname,
  validationMonthlyIncome,
  validationPhoneNum,
} from "./form-validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface INewFormForm {
  step: number;
}

interface IFormData {
  fullName: string;
  phoneNum: string;
  currentJobTitle: string;
  monthlyIncome: number;
  preferredContact: "Email" | "Phone" | "SMS";
}

const NewFormForm: React.FC<INewFormForm> = ({ step }) => {
  const form = useForm<IFormData>({
    defaultValues: {
      fullName: "",
      phoneNum: "",
      currentJobTitle: "",
      monthlyIncome: 0,
      preferredContact: "Email",
    },
    mode: "onChange",
  });

  function onSubmit(values: IFormData) {
    console.log(values);
  }

  return (
    <Card className="mt-[30px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* DIVIDER */}
          {(step === 1 || step === 6) && (
            <section>
              <CardHeader>
                <CardTitle>User Profile </CardTitle>
                <CardDescription>
                  Your personal information here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="fullName"
                  rules={validationFullname}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{" "}
            </section>
          )}
          {step === 6 && <Separator />}
          {/* DIVIDER */}
          {(step === 2 || step === 6) && (
            <section>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How should we contact you?</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="phoneNum"
                  rules={validationPhoneNum}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{" "}
            </section>
          )}
          {step === 6 && <Separator />}
          {/* DIVIDER */}
          {(step === 3 || step === 6) && (
            <section>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>
                  Enter your employment information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="currentJobTitle"
                  rules={validationCurrentJobTitle}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current job title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Software Engineer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{" "}
            </section>
          )}
          {step === 6 && <Separator />}
          {/* DIVIDER */}
          {(step === 4 || step === 6) && (
            <section>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>
                  Let us know about your financial information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="monthlyIncome"
                  rules={validationMonthlyIncome}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your monthly income"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? ""
                                : parseFloat(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{" "}
            </section>
          )}
          {step === 6 && <Separator />}
          {/* DIVIDER */}
          {(step === 5 || step === 6) && (
            <section>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Your preferences status over here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="preferredContact"
                  rules={{
                    required: "Please select a preferred contact method",
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred mode of contact</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {["Email", "Phone", "SMS"].map((val, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={val} id={val} />
                              <Label htmlFor={val}>{val}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{" "}
            </section>
          )}

          {/* DIVIDER */}
          {step === 6 && (
            <CardFooter className="pt-[30px]">
              <Button className="w-full laptopM:w-auto" type="submit">
                Submit
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default NewFormForm;
