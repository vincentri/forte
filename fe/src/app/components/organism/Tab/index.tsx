'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface ContentProps {
  header: string;
  url?: string;
  render?: React.ReactNode;
}

interface IProps {
  contents: ContentProps[];
}

const Tab = ({ contents }: IProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const tabsRef = useRef<HTMLDivElement[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const updateActiveTab = (index: number) => {
    if (contents[index].url) router.push(contents[index].url as string);
    setActiveTab(index);
  };
  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTab];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTab]);

  useEffect(() => {
    const findUrl = contents.findIndex((content) => content.url === pathName);
    if (findUrl < 0 || contents[findUrl].render) return;
    if (findUrl) setActiveTab(findUrl);
  }, [contents, pathName]);

  return (
    <div>
      <div className="relative">
        <div className="flex">
          {contents.map((content, i) => (
            <div
              className={`mr-4 text-lg font-medium cursor-pointer select-none`}
              ref={(el) => (tabsRef.current[i] = el as HTMLDivElement)}
              key={i}
              onClick={() => updateActiveTab(i)}
            >
              {content.header}
            </div>
          ))}
        </div>
        <span
          className="absolute block h-0.5 bg-purple-500 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      {contents && contents[activeTab]?.render && (
        <div className="mt-6">{contents[activeTab]?.render}</div>
      )}
    </div>
  );
};

export default Tab;
