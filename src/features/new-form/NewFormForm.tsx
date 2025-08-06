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
  validationGender,
  validationMonthlyIncome,
  validationPassword,
  validationPhoneNum,
  validationPreferences,
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
import { IFormData } from "@/types/new-form-types";
import { AppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fullName,
  phoneNum,
  currentJobTitle,
  monthlyIncome,
  preferredContact,
} from "@/store/slices/new-form-slice";

interface INewFormForm {
  step: number;
}

// CMP CMP CMP
const NewFormForm: React.FC<INewFormForm> = ({ step }) => {
  // VARS
  const dispatch = useDispatch<AppDispatch>();
  const { formData } = useSelector(
    (state: RootState) => state.newFormSliceReducer
  );
  const form = useForm<IFormData>({
    defaultValues: formData,
    mode: "onChange",
  });

  // FUNCTION
  function onSubmit(values: IFormData) {
    console.log(values);
  }

  // JSX JSX JSX
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
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // Update the form
                            dispatch(fullName({ fullName: e.target.value })); // Update Redux
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={validationPassword}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // Update the form
                            // dispatch(fullName({ fullName: e.target.value })); // Update Redux
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === form.getValues("password") ||
                      "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // Update the form
                            // dispatch(fullName({ fullName: e.target.value })); // Update Redux
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  rules={validationGender}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          {["Male", "Female", "Other"].map((val, i) => (
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
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Date of birth</FormLabel>
                      <FormControl></FormControl>
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
                        <Input
                          placeholder="Phone number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(phoneNum({ phoneNum: e.target.value }));
                          }}
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
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              currentJobTitle({
                                currentJobTitle: e.target.value,
                              })
                            );
                          }}
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
                          value={field.value === 0 ? "" : field.value} // Display empty string instead of 0
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);

                            field.onChange(value);
                            dispatch(monthlyIncome({ monthlyIncome: value }));
                          }}
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
                  rules={validationPreferences}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred mode of contact</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            dispatch(
                              preferredContact({
                                preferredContact: value,
                              })
                            );
                          }}
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
