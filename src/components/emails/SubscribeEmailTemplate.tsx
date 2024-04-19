import {
  Container,
  Html,
  Heading,
  Button,
  Link,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  isSaleOn?: boolean;
}

// I think we don't need to pass props for now but...

export const MyEmail: React.FC<Readonly<EmailTemplateProps>> = ({}) => {
  return (
    <Html>
      <Container>
        <Heading as="h1">Affinity suite is on sale!</Heading>
        <Button
          href="https://affinity.serif.com/affinity-pricing/"
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        >
          Head to their website
        </Button>
        {/* <Link href="http://localhost:3000/api/unsubscribe">
          Unsubscribe from email notifications
        </Link> */}
      </Container>
    </Html>
  );
};

export default MyEmail;
