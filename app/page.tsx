import { redirect } from 'next/navigation';
import { LANG_OPTIONS, Languages } from '@/app/enum/global';

const defaultRoute = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.route;

export default function RootPage() {
  redirect(defaultRoute);
}