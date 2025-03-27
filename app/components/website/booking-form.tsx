import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Company } from "Constant";
import { appointmentSchema } from "db/appointmentSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "~/utils/queryClient";
import PaymentMethodCard from "../payment-method-card";
import { StepsProgress } from "../StepsProgress";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

// Country list


export function BookingForm() {
  const steps = ["Personal Info", "Payment", "Confirmation"]; // Define your steps
  const { toast } = useToast();
  const [step, setStep] = useState(2);
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const form1 = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      country: "", //"Pakistan",
      city: "", //"Karachi",
      countryTravellingTo: "", //"UAE",
      firstName: "", //"kashif",
      lastName: "", //"younus",
      gender: "", //"Male",
      maritalStatus: "", // "Married",
      dateOfBirth: new Date(),
      nationality: "", //"Pakistan",
      passportNumber: "", //"123456789",
      passportIssueDate: new Date(),
      passportExpiryDate: new Date(),
      passportIssuePlace: "", //"karachi",
      visaType: "", // "Work",
      email: "", // "kashif@gmail.com",
      phone: "", // "4968746343",
      nationalId: "", // "65465465",
      positionAppliedFor: "", //"Doctor",
      otherPosition: "", //"",
      informationAccurate: false,
      paymentMethod: "",
      trxID: "",
      paymentScreenshot: "",
    },
  });

  // scroll to specific position
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      country: "Pakistan",
      city: "Karachi",
      countryTravellingTo: "UAE Dubai",
      firstName: "Kashif",
      lastName: "Younus",
      gender: "Male",
      maritalStatus: "Married",
      dateOfBirth: "1990-01-01",
      nationality: "Pakistan",
      passportNumber: "123456789",
      passportIssueDate: "2020-01-01",
      passportExpiryDate: "2030-01-01",
      passportIssuePlace: "Karachi",
      visaType: "Work Visa",
      email: "kashif@gmail.com",
      phone: "4968746343",
      nationalId: "65465465",
      positionAppliedFor: "Doctor",
      otherPosition: "",
      informationAccurate: true,

      // Payment Fields
      paymentMethod: "JazzCash",
      trxID: "TRX123456",
    },
  });

  const uploadFileAPI = async (file: File | null) => {
    if (!file) {
      throw new Error("Screenshot file not found");
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiRequest("POST", "/api/uploadfile", formData);
    return res;
  };

  const mutation = useMutation({
    mutationFn: (formData) =>
      apiRequest("POST", "/api/appointments", formData),
    onSuccess: () => {
      setStep(3);
      toast({
        title: "Success",
        description: "Your appointment is confirmed.",
      });
      console.log("Form submitted successfully");
    },
    onError: (error) => {
      uploadFileAPI(fileUpload);
      console.log("Error submitting form:", error);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        setStep(2);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error?.error || "An error occurred while submitting the form.",
        });
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  useEffect(() => {
    scrollTo("appointment_form");
  }, [step]);
  const handleNext = async () => {
    const formData = await form.getValues();
    const isValid = await form.trigger([
      "country",
      "city",
      "firstName",
      "lastName",
      "dateOfBirth",
      "nationality",
      "passportNumber",
      "passportIssueDate",
      "passportExpiryDate",
      "passportIssuePlace",
      "visaType",
      "email",
      "phone",
      "nationalId",
      "positionAppliedFor",
      "informationAccurate",
    ]);
    // check if all fields are filled
    if (step === 1) {
      // Check if validation failed
      if (!isValid) {
        console.log("Validation Errors:", form.formState.errors); // Display which fields are invalid
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields before proceeding.",
        });
        return;
      }
      setStep((prev) => prev + 1);
    }
    if (step === 2) {
      const isValid = await form.trigger([
        "paymentMethod",
        "trxID",
        "paymentScreenshot",
      ]);
      // Check if validation failed
      if (!isValid) {
        console.log("Validation Errors:", form.formState.errors); // Display which fields are invalid
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields before proceeding.",
        });
        return;
      }
    } else {
      setFormValues(formData);
    }

    console.log("form data", formData);
    //setStep((prev) => prev + 1);
  };
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileUpload(file);
      uploadFileAPI(file);
    }
  };

  return (
    <section
      id="appointment_form"
      className=" flex justify-center items-center w-[95%] lg:max-w-[90%] xl:max-w-[70%]"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div className="container">
        <div className="text-center mb-12"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              mutation.mutate(values);
              setIsLoading(true);
            })}
            className="space-y-8"
          >
            <div>
              {/* Add Steps Progress */}
              <StepsProgress steps={steps} currentStep={step} />
            </div>
            {step === 1 && (
              <>
                {/* Booking Form - Step 1 */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <p className="font-bold text-xl  ">
                        Location Information:
                      </p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countryAppointment.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="countryTravellingTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country Travelling To *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select GCC country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {gccCountries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl  ">
                        Candidate's Passport information:
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">
                              First Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="First Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="Last Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth *</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="h-14 text-lg border-yellow-400 border-t-2 bg-blue-700 text-white"
                                {...field}
                                value={field.value.toString()}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {country_list.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {genders.map((gender) => (
                                  <SelectItem key={gender} value={gender}>
                                    {gender}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {maritalStatuses.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="passportNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport No *</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 text-lg border-yellow-400 border-t-2"
                                maxLength={9}
                                placeholder="Enter passport number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="passportIssueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport Issue Date *</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="h-14 text-lg border-yellow-400 border-t-2 bg-blue-700 text-white"
                                {...field}
                                value={field.value.toString()}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="passportExpiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport Expiry Date *</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="h-14 text-lg border-yellow-400 border-t-2 bg-blue-700 text-white"
                                {...field}
                                value={field.value.toString()}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="passportIssuePlace"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport Issue Place *</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 text-lg border-yellow-400 border-t-2"
                                placeholder="Enter issue place"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="visaType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Visa Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Visa Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {visaTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email ID *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="your@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone / Mobile No *</FormLabel>
                            <FormControl>
                              <Input
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="+923xxxxxxxxx"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationalId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>National CNIC No *</FormLabel>
                            <FormControl>
                              <Input
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="Enter CNIC number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="positionAppliedFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position Applied For *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positions.map((position) => (
                                  <SelectItem key={position} value={position}>
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("positionAppliedFor") === "Other" && (
                        <FormField
                          control={form.control}
                          name="otherPosition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Other Position</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 text-lg"
                                  placeholder="Specify other position"
                                  {...field?.ref}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="informationAccurate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Kindly recheck again that the information given
                                in this form is true, Complete and accurate?
                                <Separator className="my-2" />
                                مہربانی کرکے دوبارہ چیک کریں کہ اس فارم میں دی
                                گئی معلومات مکمل اور درست ہیں؟
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div
                      className="w-full"
                      style={{
                        fontFamily: "Poppins",
                      }}
                    >
                      <Button
                        type="button"
                        className="w-full bg-blue-700 text-white text-lg rounded-lg"
                        onClick={handleNext}
                      >
                        Next ➡️
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}

            {step === 2 && (
              <>
                <Card id="">
                  <CardHeader>
                    <CardTitle>
                      <div className="text-center font-medium">
                        OFFICIAL Gamca Medical Appointment - Fee = Rs.4000/-
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="">
                      <h2 className="text-center font-medium bg-yellow-300 rounded-lg p-2">
                        Fee is increased due to increase in Government taxes and
                        $ (USD) exchange rate.
                      </h2>
                    </div>
                  </CardContent>
                </Card>
                {/* Payment Details - Step 2 */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="">
                      <PaymentMethodCard />
                    </div>
                  </CardContent>
                  <CardContent className="space-y-4">
                    <div className="">
                      <h2 className="mb-4 text-center font-bold text-2xl text-red-600 rounded">
                        Important Announcement:
                      </h2>
                      <h2 className="text-center font-medium bg-yellow-300 text-gray-700 rounded-lg p-2">
                        Pay the total amount of =4000/ on the one of the above
                        given account number and after payment share the
                        screenshot of payment blow
                      </h2>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Method *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="h-14 text-lg border-yellow-400 border-t-2">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Payment Method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {paymentMethods.map((payMethod) => (
                                  <SelectItem key={payMethod} value={payMethod}>
                                    {payMethod}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="trxID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Bank Account No/ Deposit slip No/ Trx. ID No *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-14 text-lg border-yellow-400 border-t-2"
                                placeholder="Enter transaction number TRX ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="fileUpload">Screen Shot</Label>
                        <Input
                          id="fileUpload"
                          type="file"
                          onChange={handleFileUpload}
                        />
                      </div>

                      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                          <FormLabel>Screen Shot *</FormLabel>
                          
                            <FormMessage/>
                        </div> */}
                      {/* <FormField
                        control={form.control}
                        name="paymentScreenshot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Screenshot *</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  field.onChange(e.target.files[0])
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <Button
                        type="button"
                        className="w-full bg-gray-900"
                        onClick={handleBack}
                      >
                        ⬅️ Back
                      </Button>
                    </div>
                    <div>
                      <Button type="submit" className="bg-green-600 w-full">
                        {isLoading ? (
                          <>
                            <IconLoader2 className="animate-spin" />
                            Please wait...
                          </>
                        ) : (
                          "Submit Application ✅"
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}

            {step === 3 && (
              <>
                <AfterSubmitPage />
              </>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}

const AfterSubmitPage = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${Company.whatsApp}`, "_blank");
  };

  return (
    <div className="">
      <div className="mb-4">
        <h1 className="text-lg lg:text-3xl font-bold text-green-300 rounded-xl bg-black p-4 lg:p-10 text-center">
          Thank you for Submit Gamca Medical Registration Form
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-between items-center bg-blue-700 rounded-xl p-4">
          <div className="flex flex-col items-center justify-center border-white border p-6 rounded-xl">
            <div className="flex justify-center items-center w-64 h-72 rounded-xl mb-4">
              <div>
                <img
                  src="/logo1.jpg"
                  className="object-contain rounded-xl justify-center items-center w-full h-full"
                />
              </div>
            </div>
            <p className="lg:text-lg text-white text-justify">
              Click on the{" "}
              <span className="font-bold text-gray-800 bg-yellow-400">
                (WHATSAPP BUTTON)
              </span>{" "}
              below share your{" "}
              <span className="font-bold text-gray-800 bg-yellow-400">
                (Payment Slip)
              </span>{" "}
              and{" "}
              <span className="font-bold text-gray-800 bg-yellow-400">
                (Passport Front Page)
              </span>{" "}
              on WhatsApp for verification. This is needed to receive the GAMCA
              Medical Token Slip after fee Verification. Your Appointment PDF
              file will be sent to your email or WhatsApp.
            </p>
          </div>

          <div className="flex items-end justify-center  p-4 bg-gray-200  rounded-xl mt-4">
            <p className="font-bold lg:text-xl">
              For any query or help, please contact us on WhatsApp at{" "}
              <span className="text-green-500 font-bold">
                {Company.whatsApp}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center bg-blue-700 rounded-xl p-4 text-white">
          <div className="border-white border p-6 rounded-xl mb-4">
            <p className="">
              Appointment Token Validity 1 Month
              <br />
              Entry Timming Of Medical Center
            </p>
            <p>
              Morning (9-AM to 01-PM) Documents Required for Medical Center
              Note: Medical Center Fees shall be paid on Medical Center Medical
              Fee 19,000/- Normal (Report 72 Hours) 20,000/- Urgent (Report 24
              Hours)
            </p>
            <ol className="list-decimal list-inside mt-4 border-gray-400 border p-6 rounded-xl">
              <li>Original Passport</li>
              <li>Original CNIC </li>
              <li>Four (4) Photos Passport Size</li>
              <li>One Passport Copy (Color/B&W) </li>
              <li>Two CNIC Copies (B&W) </li>
              <li>Covid-19 Vaccination Certificate (Optional) </li>
            </ol>
          </div>
          <div className="border-white border p-6 rounded-xl">
            <div className="mx-10 bg-gray-200 p-2 rounded-xl">
              <h1 className="text-center text-red-800 font-bold">Note:</h1>
            </div>
            <p className="px-10 py-4">
              Registration Processing Time is 1 to 2 hours.Please keep
              patience….!
            </p>
            <p className="text-justify px-10 mb-6 font-serif mt-4">
              ہماری خدمات کو منتخب کرنے کے لیے آپ کا شکریہ۔ توجہ فرمایے! نیچے
              دیئے گئے بٹن پر کلک کریں اور فیس کا اسکرین شاٹ یا فیس کی رسید اور
              اپنے پاسپورٹ کے فرنٹ پیج کی تصویر واٹس ایپ پر شیئر کریں۔ رجسٹریشن
              فیس کی تصدیق کے بعد، آپ کی میڈیکل ٹوکن سلپ آپ کے ای میل یا واٹس
              ایپ پر بھیج دی جائے گی۔
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 mt-10">
              {/* <div className="w-full">
              <Button className="w-full h-14 flex items-center justify-center gap-2 bg-green-500">
                Book New Appointment
              </Button>
            </div> */}
              <div className="w-full ">
                <Button
                  className="w-full h-14 flex items-center justify-center gap-2 bg-green-500"
                  onClick={handleWhatsAppClick}
                >
                  GET YOUR SLIP ON WHATSAPP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
