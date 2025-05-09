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
    const fetchProjects = async () => {
      const query = `*[_type == "teamMember"] {
            _id,
            fullName,
            slug,
            specificity,
            role,
            avatar
          }`;
      const result = await client.fetch(query);
      setTeamMembers(result);
      console.log({ result });
    };

    fetchProjects();
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
                  Advocacy for youth women and girls development impact
                  initiative for Africa (AYDii Africa) is a non-governmental
                  organization dedication to the synergy of organizations,
                  communities, and relevant stakeholders to create innovative,
                  impactful, and sustainable solutions in promoting climate
                  action, addressing critical socio-economic challenges and
                  ensuring peace justice and strong institution. We are
                  committed to fostering community resilience and sustainable
                  development in Nigeria and Africa at large. With a focus on
                  addressing the socio-economic and non economic loss and damage
                  impacts of climate change, the organization leverages
                  grassroots strategies to promote well-being, empowerment, and
                  recovery for vulnerable communities. The Ganaja community
                  project aligns with our mission to address the profound
                  effects of flood disasters that have continuously affected
                  individuals and families over the years, leading to
                  debilitating psycho-social challenges.
                </p>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <p className="font-light text-lg">
                  We have actively engaged with local chiefs and community
                  leaders to advocate for women participation in environmental
                  sustainability activities such a tree planting and organized
                  grassroots campaigns on the importance of community members to
                  actively participate in protecting the rights of women and
                  girls. Additionally, out current project focuses on empowering
                  women in underserved communities to become environmental
                  leaders and champions for climate justice. Through community
                  organizing initiatives, to create a more sustainable and
                  equitable future for all.
                </p>
                <span className="text-9xl font-[100] text-primary">02</span>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">03</span>
                <p className="font-light text-lg">
                  Through unwavering commitments, partnerships and collective
                  efforts, our mission is to create a world where poverty, human
                  trafficking, forced displacement, irregular migration and
                  inequalities are eradicated, people can thrive in a society
                  that values and protect their dignity, equality, and freedom
                  through sustainable climate action, economic growth, peace,
                  justice and strong institution.
                </p>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <div className="font-light text-lg">
                  <p className="text-2xl mb-4">OUR ACTIVITIES</p>
                  <ol className="list-decimal ml-5 flex flex-col gap-4">
                    <li>
                      To create a platform for youth-led activities,
                      initiatives, and events that promotes youth empowerment
                      and provides a space for sustainable development.{' '}
                    </li>
                    <li>
                      To Provide education, awareness and advocacy programs to
                      create wider public understanding of issues around climate
                      mobility, displacement and human trafficking.
                    </li>
                  </ol>
                </div>
                <span className="text-9xl font-[100] text-primary">04</span>
              </article>
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">05</span>
                <p className="font-light text-lg">
                  Our theory of change for “Roots for Change: Youth and women
                  Led Action” is based on the belief that by engaging and
                  empowering local communities using faith actors and
                  traditional rulers as influencers through youths and women
                  engagements we can create positive environmental, social, and
                  economic outcomes that will benefit both people and nature in
                  the long run to address development issues.
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
              {teamMembers.map((teamMember) => (
                <Link
                  passHref
                  href={`/team/${teamMember.slug?.current}`}
                  key={teamMember._id}
                  className={`p-4 text-center flex flex-col items-center justify-center gap-4 border border-gray-200 hover:border-primary rounded-md py-16 transition-all duration-300`}
                >
                  <figure className="h-[8rem] w-[8rem] overflow-hidden rounded-full">
                    <Image
                      src={urlFor(teamMember.avatar).url()}
                      alt={teamMember.fullName}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <article>
                    <h4 className="font-light text-2xl">
                      {teamMember.fullName}
                    </h4>
                    <p className="text-gray-500 font-light">
                      {teamMember.role}
                    </p>
                  </article>
                </Link>
              ))}
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
