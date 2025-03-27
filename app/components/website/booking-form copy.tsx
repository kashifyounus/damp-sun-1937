import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertAppointmentSchema } from "db/schema";
import { useForm } from "react-hook-form";
import { apiRequest } from "~/utils/queryClient";
import moment from "moment";

const countries = [
  "Pakistan",
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];
const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Dubai",
  "Abu Dhabi",
  "Doha",
  "Riyadh",
];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const visaTypes = ["Tourist", "Business", "Work", "Student", "Medical"];
const positions = ["Doctor", "Nurse", "Technician", "Administrative", "Other"];

export function BookingForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      country: "Pakistan",
      city: "Karachi",
      countryTravellingTo: "UAE",
      firstName: "",
      lastName: "",
      dateOfBirth: moment(new Date()).toDate(), //new Date(),
      nationality: "",
      gender: "",
      maritalStatus: "Married",
      passportNumber: "",
      passportIssueDate: new Date(), //new Date().toISOString().split("T")[0],
      passportExpiryDate: new Date(), //.toISOString().split("T")[0],
      passportIssuePlace: "",
      visaType: "Work",
      email: "",
      phone: "",
      nationalId: "",
      positionAppliedFor: "Doctor",
      otherPosition: "",
      informationAccurate: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: any) =>
      apiRequest("POST", "/api/appointments", formData),
    onSuccess: (variables) => {
      toast({
        title: "Appointment Booked",
        description: "Your medical appointment has been successfully booked.",
      });
      console.log("formData", variables);
      //form.reset();
    },
    onError: (variables) => {
      console.log("formData", variables);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to book appointment. Please try again.",
      });
    },
  });

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Book a Medical Appointment
          </h2>
          <p className="text-gray-600">
            Please fill in all the required information to schedule your medical
            appointment
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
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
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
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
                          <FormControl>
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
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select GCC country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries
                              .filter((c) =>
                                [
                                  "Saudi Arabia",
                                  "UAE",
                                  "Qatar",
                                  "Kuwait",
                                  "Bahrain",
                                  "Oman",
                                ].includes(c)
                              )
                              .map((country) => (
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
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
                          <Input placeholder="Last Name" {...field} />
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
                          <Input type="date" {...field} value={field.value.toString()} />
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
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
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
                          <FormControl>
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
                          <FormControl>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passport Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport number № *</FormLabel>
                        <FormControl>
                          <Input
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
                        <Input type="date" {...field} value={field.value.toString()} />
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
                        <Input type="date" {...field} value={field.value.toString()} />
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
                          <Input placeholder="Enter issue place" {...field} />
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
                          <FormControl>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                        <FormLabel>Phone / Mobile № *</FormLabel>
                        <FormControl>
                          <Input placeholder="+923xxxxxxxxx" {...field} />
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
                        <FormLabel>National CNIC № *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter CNIC number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                        <FormControl>
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
                            placeholder="Specify other position"
                            {...field?.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
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
                          Kindly recheck again that the information given in
                          this form is true, Complete and accurate?
                          <br />
                          مہربانی کرکے دوبارہ چیک کریں کہ اس فارم میں دی گئی
                          معلومات مکمل اور درست ہیں؟
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
