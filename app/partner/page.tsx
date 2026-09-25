
import { Container } from '../components/common/Container';
import Link from 'next/link';
import Metrics from '../components/Metrics';

const Partner = () => {
  return (
    <main>
      <article className="bg-primary text-white text-center h-[15rem] md:h-[20rem] mb-16 py-20 md:py-20 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-light md:text-5xl font-heading mb-6">
          Partner With AYDii Africa
        </h1>
        <p className="text-white font-light max-w-3xl">
          Join us in building a sustainable, equitable, and resilient future
          for African communities through strategic, grassroots-driven climate
          action and empowerment.
        </p>
      </article>

      <div className="">
        <section className="py-10 pt-4">
          <Container>
            <div className="grid gap-10">
              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">01</span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-light">
                    A Unique Value Proposition
                  </h2>
                  <p className="font-light text-lg">
                    Partnership with AYDii Africa offers a unique value
                    proposition grounded in international accreditation and
                    deep grassroots trust. We are ready to scale our impact
                    across the eleven Great Green Wall frontline states and
                    high-burden areas across Nigeria.
                  </p>
                </div>
              </article>

              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">02</span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-light">
                    International and National Recognition
                  </h2>
                  <ul className="font-light text-lg space-y-3 list-disc list-inside">
                    <li>
                      <span className="font-normal">UNCCD Accredited:</span>{' '}
                      Observer status to the United Nations Convention to
                      Combat Desertification.
                    </li>
                    <li>
                      <span className="font-normal">LDYC Member:</span> Active
                      participant in the global Loss and Damage Youth
                      Coalition.
                    </li>
                    <li>
                      <span className="font-normal">NAGGW Partner:</span>{' '}
                      Official partner of the National Agency for the Great
                      Green Wall under the Green Women Platform and Youth
                      Board.
                    </li>
                    <li>
                      <span className="font-normal">NACTAL Partner:</span> A
                      quadripartite recognition linking climate, migration,
                      child protection, and women&apos;s rights.
                    </li>
                  </ul>
                </div>
              </article>

              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">03</span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-light">
                    Grassroots Implementation
                  </h2>
                  <ul className="font-light text-lg space-y-3 list-disc list-inside">
                    <li>
                      <span className="font-normal">Community Trusted:</span>{' '}
                      Proven capacity evidenced by our Ganaja flood recovery
                      intervention, establishing ICT and fashion skills
                      centres.
                    </li>
                    <li>
                      <span className="font-normal">
                        Intersectional Approach:
                      </span>{' '}
                      Our RESILIENCE Framework addresses the root causes of
                      vulnerability, linking climate adaptation to economic
                      empowerment.
                    </li>
                    <li>
                      <span className="font-normal">Survivor-Centered:</span>{' '}
                      Fully safeguarding compliant, child-safe, and focused on
                      protecting vulnerable demographics.
                    </li>
                  </ul>
                </div>
              </article>

              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">04</span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-light">
                    Youth and Women-Led Leadership
                  </h2>
                  <ul className="font-light text-lg space-y-3 list-disc list-inside">
                    <li>
                      <span className="font-normal">
                        Youth-Driven Platform:
                      </span>{' '}
                      Our core team is primarily aged 35 and below, providing
                      an inclusive platform for the next generation of climate
                      leaders.
                    </li>
                    <li>
                      <span className="font-normal">Technical Expertise:</span>{' '}
                      Led by a Founder with nine years of civil service
                      experience, including service as an Intelligence Officer
                      at NAPTIP, and an MBA in Finance.
                    </li>
                    <li>
                      <span className="font-normal">Value for Money:</span>{' '}
                      Delivering high impact through a lean organizational
                      structure and a dedicated volunteer model.
                    </li>
                  </ul>
                </div>
              </article>

              <article className="flex flex-col md:flex-row items-start justify-center gap-10 border p-5 md:p-10 border-gray-200 rounded-md">
                <span className="text-9xl font-[100] text-primary">05</span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-light">
                    Global Framework Alignment
                  </h2>
                  <ul className="font-light text-lg space-y-3 list-disc list-inside">
                    <li>
                      <span className="font-normal">SDGs:</span> Strong
                      programmatic alignment with SDGs 1, 4, 5, 8, 10, 13, 15,
                      and 16.
                    </li>
                    <li>
                      <span className="font-normal">AU Agenda 2063:</span>{' '}
                      Directly advancing Aspirations 1, 3, and 6 for a
                      prosperous, well-governed, and people-driven Africa.
                    </li>
                    <li>
                      <span className="font-normal">
                        World Bank Alignment:
                      </span>{' '}
                      Strategically positioned alongside the World Bank Gender
                      Strategy, Climate Action Plan, and Youth Inclusion
                      agenda.
                    </li>
                  </ul>
                </div>
              </article>

              <article className="flex flex-col items-start justify-center gap-6 border p-5 md:p-10 border-gray-200 rounded-md">
                <h2 className="text-3xl font-light">Ready to collaborate?</h2>
                <p className="font-light text-lg">
                  Whether you are an international donor, a government agency,
                  or a private sector partner, we invite you to join us in
                  scaling sustainable climate action and community resilience.
                </p>
                <Link
                  href="/contact"
                  className="inline-block border border-primary text-primary hover:bg-primary hover:text-white rounded-md px-6 py-3 transition-all duration-300"
                >
                  Contact Our Team
                </Link>
              </article>
            </div>
          </Container>
        </section>
      </div>
      <Metrics />
    </main>
  );
};

export default Partner;
