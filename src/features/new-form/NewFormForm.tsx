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
  validationAddress,
  validationCity,
  validationCompanyName,
  validationCountry,
  validationCurrentJobTitle,
  validationDob,
  validationFullname,
  validationGender,
  validationMonthlyIncome,
  validationPassword,
  validationPhoneNum,
  validationPostalCode,
  validationPreferences,
  validationYoe,
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
  password,
  confirmPassword,
  gender,
  setDob,
  alternatePhoneNum,
  phoneNum,
  addressLine1,
  addressLine2,
  country,
  city,
  postalCode,
  currentJobTitle,
  employmentStatus,
  companyName,
  yearsOfExperience,
  monthlyIncome,
  preferredContact,
} from "@/store/slices/new-form-slice";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OptionalFieldLabel from "@/components/OptionalFieldLabel";
import RequiredFieldAsterisk from "@/components/RequiredFieldAsterisk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          {/* DIVIDER  */}
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
                      <FormLabel>
                        Full Name <RequiredFieldAsterisk />{" "}
                      </FormLabel>
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
                      <FormLabel>
                        Password <RequiredFieldAsterisk />{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(password({ password: e.target.value }));
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
                      <FormLabel>
                        Confirm Password <RequiredFieldAsterisk />{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              confirmPassword({
                                confirmPassword: e.target.value,
                              })
                            );
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
                      <FormLabel>
                        Gender <RequiredFieldAsterisk />{" "}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            dispatch(
                              gender({
                                gender: value,
                              })
                            );
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
                  rules={validationDob}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Date Of Birth <RequiredFieldAsterisk />{" "}
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              captionLayout="dropdown"
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date);
                                dispatch(setDob({ dob: date }));
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
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
                  rules={{
                    ...validationPhoneNum,
                    required: "Phone number is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number
                        <RequiredFieldAsterisk />
                      </FormLabel>
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
                <FormField
                  control={form.control}
                  name="alternatePhoneNum"
                  rules={validationPhoneNum}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Alternate Phone Number <OptionalFieldLabel />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alternate Phone number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              alternatePhoneNum({
                                alternatePhoneNum: e.target.value,
                              })
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  rules={{
                    ...validationAddress,
                    required: "Address is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address Line 1 <RequiredFieldAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address Line 1"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // Update the form
                            dispatch(
                              addressLine1({ addressLine1: e.target.value })
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  rules={validationAddress}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address Line 2
                        <OptionalFieldLabel />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address Line 2"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              addressLine2({ addressLine2: e.target.value })
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  rules={validationCountry}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Country <RequiredFieldAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            dispatch(country({ country: value }));
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pakistan">Pakistan</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Iran">Iran</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  rules={validationCity}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City <RequiredFieldAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            dispatch(city({ city: value }));
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sialkot">Sialkot</SelectItem>
                            <SelectItem value="Peshawar">Peshawar</SelectItem>
                            <SelectItem value="Islamabad">Islamabad</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  rules={validationPostalCode}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Postal Code <RequiredFieldAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address Line 2"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              postalCode({ postalCode: e.target.value })
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
                  rules={{
                    ...validationCurrentJobTitle,
                    validate: (value) => {
                      const shouldBeRequired =
                        formData.employmentStatus === "Employed";

                      if (shouldBeRequired && !value) {
                        return "Job title is required for employed users";
                      }

                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Job Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            formData.employmentStatus === "Unemployed" ||
                            formData.employmentStatus === "Student"
                          }
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

                <FormField
                  control={form.control}
                  name="employmentStatus"
                  rules={{
                    required: "Employment status is required",
                    validate: (value) =>
                      ["Employed", "Unemployed", "Student"].includes(value) ||
                      "Status must be Employed, Unemployed, or Student",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Employment Status
                        <RequiredFieldAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            dispatch(
                              employmentStatus({ employmentStatus: value })
                            );
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Employed">Employed</SelectItem>
                            <SelectItem value="Unemployed">
                              Unemployed
                            </SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{
                    ...validationCompanyName,
                    validate: (value) => {
                      const shouldBeRequired =
                        formData.employmentStatus === "Employed";

                      if (shouldBeRequired && !value) {
                        return "Company name is required for employed users";
                      }

                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            formData.employmentStatus === "Unemployed" ||
                            formData.employmentStatus === "Student"
                          }
                          placeholder="e.g., FabTechSol"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            dispatch(
                              companyName({
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
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  rules={{
                    ...validationYoe,
                    validate: (value) => {
                      const shouldBeRequired =
                        formData.employmentStatus === "Employed";

                      if (shouldBeRequired && !value) {
                        return "Years of experience is required for employed users";
                      }

                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years Of Experience</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            formData.employmentStatus === "Unemployed" ||
                            formData.employmentStatus === "Student"
                          }
                          placeholder="e.g., 5"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);

                            field.onChange(value);
                            dispatch(
                              yearsOfExperience({ yearsOfExperience: value })
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  rules={{
                    required: "Resume is required",
                    validate: (file) => {
                      if (!file) return "Resume is required";
                      if (file.type !== "application/pdf") {
                        return "Only PDF files are allowed";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Resume</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file || null);
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
                          value={field.value === 0 ? "" : field.value}
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
                      <FormLabel>Preferred Mode Of Contact</FormLabel>
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
