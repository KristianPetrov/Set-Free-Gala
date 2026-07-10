import { Button, Heading, Section, Text } from "@react-email/components";
import { siteUrl } from "@/lib/site";
import { EmailLayout } from "./components/email-layout";

export type TicketReceiptEmailProps = {
  productTitle: string;
  quantity: number;
  amount: string;
  customerEmail?: string;
  sponsorName?: string;
  logoReceived?: boolean;
};

export function TicketReceiptEmail({
  productTitle,
  quantity,
  amount,
  customerEmail,
  sponsorName,
  logoReceived = false,
}: TicketReceiptEmailProps) {
  return (
    <EmailLayout preview={`Your ${productTitle} order for Set Free Gala is confirmed.`}>
      <Heading
        as="h1"
        className="m-0 font-display text-[32px] font-normal uppercase leading-[42px] tracking-[2px] text-gold"
      >
        You&rsquo;re On The List.
      </Heading>
      <Text className="mx-auto mb-0 mt-[16px] max-w-[430px] font-serif text-[17px] italic leading-[28px] text-paper-dim">
        We&rsquo;ll see you at the Palace.
      </Text>

      <Section className="my-[30px] border border-solid border-line px-[20px] py-[20px]">
        <Text className="m-0 text-[11px] uppercase leading-[18px] tracking-[3px] text-paper-dim">
          Order Confirmed
        </Text>
        <Text className="m-0 mt-[8px] font-display text-[24px] uppercase leading-[34px] tracking-[1px] text-paper">
          {productTitle}
        </Text>
        <Text className="m-0 mt-[10px] text-[14px] leading-[24px] text-paper-dim">
          Quantity: {quantity}
          <br />
          Total: {amount}
          {sponsorName ? (
            <>
              <br />
              Sponsor: {sponsorName}
            </>
          ) : null}
        </Text>
      </Section>

      {logoReceived ? (
        <Text className="m-0 mb-[18px] text-[14px] leading-[24px] text-paper-dim">
          We received your sponsor logo and will follow up if anything else is
          needed for the banner.
        </Text>
      ) : null}

      <Text className="m-0 text-[14px] leading-[24px] text-paper-dim">
        {customerEmail
          ? `This receipt was sent to ${customerEmail}.`
          : "This is your receipt for the order."}{" "}
        Your purchase supports food, clothing, shelter, and daily outreach.
      </Text>

      <Button
        href={`${siteUrl}/#tickets`}
        className="box-border mt-[30px] bg-gold px-[24px] py-[14px] text-center text-[11px] uppercase tracking-[3px] text-ink no-underline"
      >
        Return to the Gala
      </Button>
    </EmailLayout>
  );
}

TicketReceiptEmail.PreviewProps = {
  productTitle: "Sponsor Table",
  quantity: 1,
  amount: "$1,000",
  customerEmail: "guest@example.com",
  sponsorName: "Set Free Friends",
  logoReceived: true,
} satisfies TicketReceiptEmailProps;

export default TicketReceiptEmail;
