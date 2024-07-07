import { CryptoTable } from "@/components/crypto-table";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="py-4 px-24">
      <CryptoTable />
    </Container>
  );
}
