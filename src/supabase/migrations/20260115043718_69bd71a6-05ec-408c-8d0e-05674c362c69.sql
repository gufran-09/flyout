-- Add policies for admin to update and delete newsletter subscribers
CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));