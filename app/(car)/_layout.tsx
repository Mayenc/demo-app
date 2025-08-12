import { Stack } from 'expo-router';
import RootUI from '../../components/RootUI';

export default function CarLayout({ children }: { children: React.ReactNode }) {
  return <RootUI>
        <Stack screenOptions={{ headerShown: false }}>
            {children}
        </Stack>
      </RootUI>;
}