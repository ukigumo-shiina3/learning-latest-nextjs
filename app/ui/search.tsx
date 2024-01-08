'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

export default function Search({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useQueryState('query', {
    shallow: false, //URLの変更があればコンポーネントが再レンダリングされ、それに伴ってクエリパラメータが更新される
    throttleMs: 1000, //1秒間間引かせることで検索フォームの文字入力のリクエスト回数を削減する
  });
  const [page, setPage] = useQueryState('query', {
    shallow: false,
    throttleMs: 1000,
  });
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // function handleSearch(term: string) {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('query', term);
  //   } else {
  //     params.delete('query');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          setPage('1');
          setQuery(e.target.value);
        }}
        value={query || ''}
        // onChange={(e) => {
        //   handleSearch(e.target.value);
        // }}
        // defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
