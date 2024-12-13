'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { formEditProfile } from '../account/edit-profile/page';

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  form: UseFormReturn<z.infer<typeof formEditProfile>>;
  isLoading?: boolean;
}

export function DatePicker({
  date,
  setDate,
  form,
  isLoading = false,
}: DatePickerProps) {
  return (
    <div className="flex flex-col items-start">
      <Label className="text-base mb-2">Date Of Birth</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading}
            variant={'outline'}
            className={cn(
              'w-full h-[44px] text-base justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-sm">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);
              form.setValue('dateOfBirth', selected!);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
