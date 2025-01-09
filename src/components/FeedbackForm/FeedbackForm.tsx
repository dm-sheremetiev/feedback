"use client";

import {
  Button,
  easing,
  fadeInUp,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/Form";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { Loader } from "rsuite";

import "rsuite/Loader/styles/index.css";

interface FormType {
  text: string;
}

export const FeedbackForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<FormType>({
    defaultValues: {
      text: "",
    },
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const controls = useAnimation();

  const { control } = methods;

  const onSubmit = async (values: FormType) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);

      const formData = new FormData();
      formData.append("text", values.text);

      await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5,
            easing,
          },
        },
      }}
    >
      <div
        className="flex gap-3 flex-col items-center container w-full mt-[100px]"
        ref={ref}
      >
        <motion.h2
          className="font-bold text-[24px] md:text-[48px] text-center px-4"
          variants={fadeInUp}
        >
          Форма зворотнього зв&apos;язку
        </motion.h2>

        <motion.div variants={fadeInUp} className="z-full relative z-[12] px-4">
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-4 flex gap-2 flex-col w-full max-w-[700px] border border-gray-300 rounded-xl bg-transparent shadow-md"
            >
              <FormField
                control={control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-1">
                      Опишіть детально ваще питання/проблему/скаргу/пропозицію
                      та відправте натиснувши на кнопку
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        required
                        placeholder="Введіть текст"
                        {...field}
                        className="border-[#fff] text-[#fff] placeholder:text-[#fff] bg-transparent mt-2 w-full border p-4 rounded-2xl color-black placeholder-color-black transition-none hover:shadow-sm active:border-white focus:border-white outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="h-[43px] flex items-center justify-center w-[124.6px] mt-2 border py-2 px-3  rounded-2xl transition-all"
                >
                  {isLoading ? <Loader /> : "Відправити"}
                </Button>
              </div>

              {isSuccess && (
                <div className="text-center mt-4">
                  Ваша відповідь записана, дякуємо!
                </div>
              )}
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.div>
  );
};
