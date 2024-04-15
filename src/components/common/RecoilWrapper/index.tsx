'use client'
import { RecoilRoot } from 'recoil';

type Props = {
  children: React.ReactNode
}

const RecoilWrapper = ({ children }: Props) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
};

export default RecoilWrapper;