export interface CertificateData {
  title: string;
  recipientName: string;
  date: string;
  signatures: { name: string; image: string }[];
  backgroundImage?: string;
  customCss?: string;
}