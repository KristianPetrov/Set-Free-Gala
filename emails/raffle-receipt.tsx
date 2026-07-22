import { Button, Heading, Section, Text } from "@react-email/components";
import { siteUrl } from "@/lib/site";
import { EmailLayout } from "./components/email-layout";

export type RaffleReceiptEmailProps = {
  buyerName: string;
  productTitle: string;
  quantity: number;
  amount: string;
  customerEmail: string;
};

export function RaffleReceiptEmail({
  buyerName,
  productTitle,
  quantity,
  amount,
  customerEmail,
}: RaffleReceiptEmailProps) {
  return (
    <EmailLayout preview={`Your ${productTitle} raffle purchase is confirmed.`}>
      <Heading
        as="h1"
        className="m-0 font-display text-[32px] font-normal uppercase leading-[42px] tracking-[2px] text-gold"
      >
        You&rsquo;re In The Drawing.
      </Heading>
      <Text className="mx-auto mb-0 mt-[16px] max-w-[430px] font-serif text-[17px] italic leading-[28px] text-paper-dim">
        Thank you, {buyerName}. Your purchase helps Set Free serve the community.
      </Text>

      <Section className="my-[30px] border border-solid border-line px-[20px] py-[20px]">
        <Text className="m-0 text-[11px] uppercase leading-[18px] tracking-[3px] text-paper-dim">
          Raffle Purchase Confirmed
        </Text>
        <Text className="m-0 mt-[8px] font-display text-[22px] uppercase leading-[32px] tracking-[1px] text-paper">
          {productTitle}
        </Text>
        <Text className="m-0 mt-[10px] text-[14px] leading-[24px] text-paper-dim">
          Raffle tickets: {quantity}
          <br />
          Total: {amount}
        </Text>
      </Section>

      <Text className="m-0 text-[14px] leading-[24px] text-paper-dim">
        This confirmation was sent to {customerEmail}. Set Free has received your
        entry details and will contact you if your entry is selected.
      </Text>

      <Button
        href={`${siteUrl}/#raffle`}
        className="box-border mt-[30px] bg-gold px-[24px] py-[14px] text-center text-[11px] uppercase tracking-[3px] text-ink no-underline"
      >
        View the Raffle
      </Button>
    </EmailLayout>
  );
}

RaffleReceiptEmail.PreviewProps = {
  buyerName: "Jordan Guest",
  productTitle: "Fieldy’s Signed Bass",
  quantity: 3,
  amount: "$75",
  customerEmail: "guest@example.com",
} satisfies RaffleReceiptEmailProps;

export default RaffleReceiptEmail;
