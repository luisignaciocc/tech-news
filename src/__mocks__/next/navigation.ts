import { useSearchParams } from "next/navigation";

export const useRouter = jest.fn().mockReturnValue({
  push: jest.fn(),
});

export { useSearchParams };
