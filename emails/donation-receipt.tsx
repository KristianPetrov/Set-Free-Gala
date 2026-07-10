import { Button, Heading, Section, Text } from "@react-email/components";
import { siteUrl } from "@/lib/site";
import { EmailLayout } from "./components/email-layout";

export type DonationReceiptEmailProps = {
  amount: string;
  frequency: "once" | "monthly";
  customerEmail?: string;
};

export function DonationReceiptEmail({
  amount,
  frequency,
  customerEmail,
}: DonationReceiptEmailProps) {
  const monthly = frequency === "monthly";

  return (
    <EmailLayout
      preview={`Thank you for your ${monthly ? "monthly " : ""}gift to Set Free Gala.`}
    >
      <Heading
        as="h1"
        className="m-0 font-display text-[34px] font-normal uppercase leading-[42px] tracking-[2px] text-gold"
      >
        Thank You.
      </Heading>
      <Text className="mx-auto mb-0 mt-[16px] max-w-[430px] font-serif text-[17px] italic leading-[28px] text-paper-dim">
        Someone&rsquo;s story just changed.
      </Text>

      <Section className="my-[30px] border border-solid border-line px-[20px] py-[20px]">
        <Text className="m-0 text-[11px] uppercase leading-[18px] tracking-[3px] text-paper-dim">
          Gift Received
        </Text>
        <Text className="m-0 mt-[8px] font-display text-[28px] leading-[36px] text-paper">
          {amount}
          {monthly ? (
            <span className="text-[16px] italic text-paper-dim"> / month</span>
          ) : null}
        </Text>
      </Section>

      <Text className="m-0 text-[14px] leading-[24px] text-paper-dim">
        {customerEmail
          ? `This receipt was sent to ${customerEmail}.`
          : "This is your receipt for the gift."}{" "}
        Your generosity funds food, clothing, shelter, daily outreach, and help
        for people finding their way to freedom.
      </Text>

      <Button
        href={`${siteUrl}/#donate`}
        className="box-border mt-[30px] bg-gold px-[24px] py-[14px] text-center text-[11px] uppercase tracking-[3px] text-ink no-underline"
      >
        Return to the Gala
      </Button>
    </EmailLayout>
  );
}

DonationReceiptEmail.PreviewProps = {
  amount: "$250",
  frequency: "once",
  customerEmail: "guest@example.com",
} satisfies DonationReceiptEmailProps;

export default DonationReceiptEmail;
