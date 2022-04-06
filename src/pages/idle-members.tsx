import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Section from '@/components/idleMembers/section';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import { ThemedComponent } from '@/interfaces/themedComponent.type';


const IDLE_MEMBERS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;

const IdleMembers: FC<ThemedComponent> = ({themeSetter, theme}) => {
  const [idleMembersList, setIdleMembersList] = useState<[]>([]);
  
  const {
    response,
    error,
    isLoading,
  } = useFetch(IDLE_MEMBERS_URL);

  useEffect(() => {
    if ('idleMemberUserNames' in response) {
      const sortedIdleMembers = response.idleMemberUserNames
        .sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()));
      setIdleMembersList(sortedIdleMembers);
    }
  }, [isLoading, response]);
  
  return (
    <Layout changeTheme={themeSetter} darkMode={theme}>
      <Head title="Idle Members | Status Real Dev Squad" />
      
      <div className="container">
        <Section heading="Idle Members" content={idleMembersList} error={error} isLoading={isLoading} darkMode={theme} />
      </div>

    </Layout>
  );
};

export default IdleMembers;
