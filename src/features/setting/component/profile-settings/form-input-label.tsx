import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import {
    Control,
    ControllerRenderProps,
    FieldErrors,
    FieldPath,
    FieldValues,
} from 'react-hook-form';

interface FormInputLabelProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    className?: string;
    type?: string;
}

const FormInputLabel = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    className,
}: FormInputLabelProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({
                field,
            }: {
                field: ControllerRenderProps<
                    TFieldValues,
                    FieldPath<TFieldValues>
                >;
            }) => (
                <FormItem className={`flex flex-col ${className}`}>
                    <FormLabel className="text-md font-semibold">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder || label}
                            {...field}
                            className="h-12 focus:border-transparent"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInputLabel;
