"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  LoginFormValue,
  loginSchema,
  RegisterFormValue,
  registerSchema,
} from "@/lib/validations/authFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";

// step 1
type AuthTab = "login" | "signup" | null;

export default function AuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //auth
  const { login } = useAuth();

  // step 2
  const tabParams = searchParams.get("activeTab");

  // step 3
  const activeTab: AuthTab =
    tabParams === "signup" || tabParams === "login" ? tabParams : "login";

  // step 4
  const handleTabChange = (value: string) => {
    router.push(`/login?activeTab=${value}`);
  };

  /* React Hook Form */

  const loginForm = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: loginRegister,
    handleSubmit: handleSubmitLogin,
    reset: handleResetLogin,
    formState: { errors: loginErrors, isSubmitting: loginIsSubmitting },
  } = loginForm;
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    reset: handleResetRegister,
    formState: { errors: registerErrors, isSubmitting: registerIsSubmitting },
  } = registerForm;

  const onSubmitLogin = async (data: LoginFormValue) => {
    // const url = "http://localhost:3000";

    // const res = await fetch(`${url}/api/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data)
    // })

    // const result = await res.json();
    // console.log(result)

    const pattern = ["a-zA-Z1-9.com"];

    if (data.username !== "dheen" && data.password !== "Dheen@777") {
      toast.error("Invalid Credentials...", {
        description: `Please try again`,
      });
      return;
    }

    login(data.username);
    console.log(data.username, data.password);

    toast.success("Login successful 🎉", {
      description: `Welcome back, ${data.username}`,
    });
    handleResetLogin();
    router.push("/home");
  };

  const onSubmitRegister = async (data: RegisterFormValue) => {
    toast.success("Registeration successful 🎉", {
      description: `Welcome, ${data.username}`,
    });
    if (!data.username) {
      toast.error("Signup failed", {
        description: `Please try again`,
      });
      return;
    }
    handleResetRegister();
    router.push("/login?activeTab=login");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <section className="flex items-center justify-between w-full p-2">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
        </section>

        {/* Login */}
        <TabsContent value="login">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Login</CardTitle>
              <CardDescription>Please Login here</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
              <CardContent className="grid gap-6">
                <FormInput
                  label="Username"
                  placeholder="Enter Username"
                  registration={loginRegister("username")}
                  errors={loginErrors.username}
                />
                <FormInput
                  type="password"
                  label="Password"
                  placeholder="Enter Password"
                  registration={loginRegister("password")}
                  errors={loginErrors.password}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loginIsSubmitting}
                  className="mt-6 w-full"
                >
                  {loginIsSubmitting ? "Submitting..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Signup */}
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create your account here</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
              <CardContent className="grid gap-6">
                <FormInput
                  label="Name"
                  placeholder="Enter Name"
                  registration={registerRegister("name")}
                  errors={registerErrors.name}
                />
                <FormInput
                  type="email"
                  label="Email"
                  placeholder="Enter Email"
                  registration={registerRegister("email")}
                  errors={registerErrors.email}
                />
                <FormInput
                  type="text"
                  label="Username"
                  placeholder="Enter Username"
                  registration={registerRegister("username")}
                  errors={registerErrors.username}
                />
                <FormInput
                  type="password"
                  label="Password"
                  placeholder="Enter Password"
                  registration={registerRegister("password")}
                  errors={registerErrors.password}
                />
                <FormInput
                  type="password"
                  label="Confirm Password"
                  placeholder="Re-enter Password"
                  registration={registerRegister("confirmpassword")}
                  errors={registerErrors.confirmpassword}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={registerIsSubmitting}
                >
                  {registerIsSubmitting ? "Submitting..." : "Register"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
