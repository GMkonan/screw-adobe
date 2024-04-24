import {
  Container,
  Html,
  Heading,
  Button,
  Link,
  Head,
  Font,
  Row,
  Hr,
  Section,
  Text,
  Body,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  userEmail: string;
  isSaleOn?: boolean;
}

// I think we don't need to pass props for now but...

export const MyEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  userEmail,
}) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* style={{ background: "#fafbfb" }} */}
      <Body>
        {/* border: "1px solid #E5E5E5" */}
        <Container style={{ textAlign: "center" }}>
          <Section>
            <Heading as="h1">Affinity suite is on sale!</Heading>
          </Section>
          <Section style={{ paddingBottom: "12px" }}>
            <Row>
              <Button
                href="https://affinity.serif.com/affinity-pricing/"
                style={{
                  background: "#0377bf",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "4px",
                  margin: "6px",
                }}
              >
                Head to their website
              </Button>
            </Row>
          </Section>
          <Row>
            <Text style={{ color: "#787676" }}>
              You are receinving this because you have subscribed to receive
              notifications when Affinity Suite is on sale. If you received this
              email by mistake, please unsubscribe by clicking the link below.
            </Text>
          </Row>
          <Hr style={{ paddingBottom: "12px" }} />
          <Link
            href={`http://localhost:3000/api/unsubscribe?email=${userEmail}`}
            // style={{
            //   textDecorationColor: "#dfe5e9",
            //   color: "#dfe5e9",
            // }}
          >
            Unsubscribe
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default MyEmail;
