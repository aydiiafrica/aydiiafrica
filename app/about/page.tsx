'use client';

import { useEffect, useState } from 'react';
import { Container } from '../components/common/Container';
import { TeamMember } from '@/types';
import { client, urlFor } from '../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import Metrics from '../components/Metrics';

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const query = `*[_type == "teamMember"] {
            _id,
            fullName,
            slug,
            specificity,
            role,
            avatar
          }`;
        const result = await client.fetch(query);
        setTeamMembers(result || []);
      } catch (error) {
        console.error('Error fetching Sanity team members:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <main>
      <article className="bg-primary text-white text-center h-[15rem] md:h-[20rem] mb-16 py-20 md:py-20 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-light md:text-5xl font-heading mb-6">
          About AYDii Africa
        </h1>
        <p className="text-white font-light">
          Explore our impactful projects aligned with the UN Sustainable
          Development Goals.
        </p>
      </article>
      <div className="">
        <section className="py-10 pt-4">
          <Container>
            <div className="grid gap-10">
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">01</span>
                <p className="font-light text-lg">
                  Advocacy for Youth Women and Girls Development Impact
                  Initiative for Africa (AYDii Africa) is a women-led and
                  youth-focused non-governmental organization. We are accredited
                  to the United Nations Convention to Combat Desertification,
                  granting observer status to the UNCCD Conference of Parties,
                  and are a member of the Loss and Damage Youth Coalition. Our
                  strategic niche comprises five interlinked areas:
                  Gender-Based Violence, Safe Migration, Girl Child Protection,
                  Women and Youth Empowerment, and Climate Change and Land
                  Restoration.
                </p>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <div className="font-light text-lg space-y-6">
                  <div>
                    <p className="text-2xl mb-4">Our Vision</p>
                    <p>
                      A world where women, girls and young people live free from
                      violence and fear, empowered with education, economic
                      agency and climate resilience, actively participating in
                      environmental governance and nation building.
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl mb-4">Our Mission</p>
                    <p>
                      To create a world where gender-based violence,
                      inequalities and climate vulnerability are eradicated,
                      where people thrive in a society that values and protects
                      dignity, equality and freedom through sustainable decent
                      work, economic growth, peace, justice, strong
                      institutions, land restoration and climate justice.
                    </p>
                  </div>
                </div>
                <span className="text-9xl font-[100] text-primary">02</span>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">03</span>
                <p className="font-light text-lg">
                  Our guiding principles include transparency and
                  accountability, honesty, mutual respect, creativity, gender
                  sensitiveness, cost efficiency, participation, and
                  utilization of local wisdom and resources. We believe in the
                  potential power of women, girls and youth to participate
                  actively in development initiatives for nation building and
                  in equal opportunity irrespective of class, age, ethnicity,
                  culture or religion.
                </p>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <div className="font-light text-lg">
                  <p className="text-2xl mb-4">The RESILIENCE Framework</p>
                  <p className="mb-4">
                    We address interconnected vulnerabilities through our
                    integrated framework:
                  </p>
                  <ul className="list-disc ml-5 flex flex-col gap-4">
                    <li>Rights and Legal Protection under the VAPP Act.</li>
                    <li>Education and Girl Child Protection.</li>
                    <li>Safe Migration and protection through NACTAL.</li>
                    <li>Income and Empowerment through green jobs.</li>
                    <li>
                      Environment and Climate Resilience under UNCCD.
                    </li>
                  </ul>
                </div>
                <span className="text-9xl font-[100] text-primary">04</span>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">05</span>
                <p className="font-light text-lg">
                  Between 2023 and 2026, AYDii Africa reached over 3,500
                  community members, trained over 200 youth and women,
                  mobilized 50 community volunteers, established 5 school-based
                  safe clubs, and supported 20 women-led weaving groups. We
                  move beyond short-term humanitarian assistance to
                  sustainable, skills-based resilience building aligned with
                  the Great Green Wall and green jobs agenda.
                </p>
              </article>
            </div>
          </Container>
        </section>
        <section className="py-10 pt-16 border-b border-gray-200">
          <Container>
            <article className="text-center mb-8">
              <h3 className="font-light text-4xl md:text-5xl text-primary">
                Meet the Team
              </h3>
            </article>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
              {teamMembers.map((teamMember) => {
                const slug = teamMember.slug?.current;
                const cardClassName =
                  'p-4 text-center flex flex-col items-center justify-center gap-4 border border-gray-200 hover:border-primary rounded-md py-16 transition-all duration-300';

                const cardContent = (
                  <>
                    <figure className="h-[8rem] w-[8rem] overflow-hidden rounded-full bg-gray-200">
                      {teamMember.avatar ? (
                        <Image
                          src={urlFor(teamMember.avatar).url()}
                          alt={teamMember.fullName || 'Team member'}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300" />
                      )}
                    </figure>
                    <article>
                      <h4 className="font-light text-2xl">
                        {teamMember.fullName || 'Unnamed Member'}
                      </h4>
                      <p className="text-gray-500 font-light">
                        {teamMember.role || 'Team Member'}
                      </p>
                    </article>
                  </>
                );

                if (!slug) {
                  return (
                    <div key={teamMember._id} className={cardClassName}>
                      {cardContent}
                    </div>
                  );
                }

                return (
                  <Link
                    passHref
                    href={`/team/${slug}`}
                    key={teamMember._id}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                );
              })}
              {teamMembers.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No team member yet.
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
      <Metrics />
    </main>
  );
};

export default About;
