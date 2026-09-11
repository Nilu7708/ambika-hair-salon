# Ambika Hair Salon — Professional V5

## Included
- Premium responsive salon website for Ambika Hair Salon, DP Road, Giram Complex, Beed, Maharashtra
- 23 services with listed prices
- Team profiles: Balaji Vaidya, Dnyanoba Vaidya, Nikhil Vaidya
- Every team member is configured for all 23 services
- Staff status: Available / On Job / On Leave
- Customer appointment selection: professional → service → salon/home service → date → 30-minute time slot
- Home service automatically charges 2× the listed base price
- Appointment board with today's schedule, WhatsApp contact and cancel action
- Prevents duplicate booking for the same professional/date/time within the same browser
- Customer 10/15-day reminder dashboard
- WhatsApp booking/confirmation links
- Salon photos, contact numbers and Google Maps search
- PWA manifest + offline shell

## Important live-booking note
This V5 browser build stores appointments and staff status in **localStorage on the current device/browser**. It prevents double-booking only for bookings made through that same browser. It does **not** provide shared real-time availability across different customers' phones.

For true multi-device live booking, the next step is to connect the appointment board to a shared backend such as Supabase/Firebase, add secure admin authentication, and enforce database-level conflict protection.

## Salon details
- Open daily: 8:30 AM–11:00 PM
- Address: DP Road, Giram Complex, Beed, Maharashtra
- Phone: 93090 96831 / 97656 34194 / 90495 92699


## Live appointment status
The team dashboard automatically shows Available, In Appointment, On Job, or On Leave. During an active 30-minute booking, the professional is shown as In Appointment. Future booked times are marked Booked in the customer booking form. This version still stores appointments locally in the browser; multi-device live synchronization requires a shared backend such as Supabase.
