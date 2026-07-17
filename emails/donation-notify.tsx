import { Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

export type DonationNotifyEmailProps = {
  amount: string;
  frequency: "once" | "monthly";
  customerEmail: string;
  customerName?: string;
  sessionId: string;
};

export function DonationNotifyEmail({
  amount,
  frequency,
  customerEmail,
  customerName,
  sessionId,
}: DonationNotifyEmailProps) {
  const monthly = frequency === "monthly";

  return (
    <EmailLayout preview={`New ${monthly ? "monthly " : ""}donation: ${amount}`}>
      <Heading
        as="h1"
        className="m-0 font-display text-[30px] font-normal uppercase leading-[40px] tracking-[2px] text-gold"
      >
        New Gift Received.
      </Heading>
      <Text className="mx-auto mb-0 mt-[16px] max-w-[430px] font-serif text-[17px] italic leading-[28px] text-paper-dim">
        Someone just gave toward freedom.
      </Text>

      <Section className="my-[30px] border border-solid border-line px-[20px] py-[20px]">
        <Text className="m-0 text-[11px] uppercase leading-[18px] tracking-[3px] text-paper-dim">
          Donation Details
        </Text>
        <Text className="m-0 mt-[8px] font-display text-[28px] leading-[36px] text-paper">
          {amount}
          {monthly ? (
            <span className="text-[16px] italic text-paper-dim"> / month</span>
          ) : null}
        </Text>
        <Text className="m-0 mt-[12px] text-[14px] leading-[24px] text-paper-dim">
          Frequency: {monthly ? "Monthly" : "One-time"}
          <br />
          From: {customerName ? `${customerName} · ` : ""}
          {customerEmail}
        </Text>
      </Section>

      <Text className="m-0 text-[12px] leading-[20px] text-paper-dim">
        Stripe session: {sessionId}
      </Text>
    </EmailLayout>
  );
}

DonationNotifyEmail.PreviewProps = {
  amount: "$250",
  frequency: "once",
  customerEmail: "guest@example.com",
  customerName: "Alex Rivera",
  sessionId: "cs_test_example",
} satisfies DonationNotifyEmailProps;

export default DonationNotifyEmail;
