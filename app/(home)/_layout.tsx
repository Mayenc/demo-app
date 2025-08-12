import { Stack } from 'expo-router';
import RootUI from '../../components/RootUI';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <RootUI>
        <Stack screenOptions={{ headerShown: false }}>
            {children}
        </Stack>
      </RootUI>;
}