import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Initiatives } from "@/sections/initiatives";
import { ResearcherProgram } from "@/sections/researcher-program";
import { Methodology } from "@/sections/methodology";
import { Challenges } from "@/sections/challenges";
import { Community } from "@/sections/community";
import { Mentors } from "@/sections/mentors";
import { Impact } from "@/sections/impact";
import { Alliances } from "@/sections/alliances";
import { LabsPreview } from "@/sections/labs-preview";
import { Participate } from "@/sections/participate";
import { Contact } from "@/sections/contact";
import { partnerProfiles, participationPaths } from "@/data/institutional";
import { getChallenges } from "@/services/challenges.service";
import { getCommunity, getMentors, getStories, getUpcomingEvents } from "@/services/community.service";
import { getLatestPosts } from "@/services/content.service";
import { getMetricsSnapshot } from "@/services/metrics.service";
import { getMethodology, getProgram } from "@/services/program.service";

export default async function HomePage() {
  const [program, methodology, challenges, community, events, mentors, snapshot, stories, posts] = await Promise.all([
    getProgram("researcher-program"),
    getMethodology(),
    getChallenges(),
    getCommunity(),
    getUpcomingEvents(),
    getMentors(),
    getMetricsSnapshot(),
    getStories(),
    getLatestPosts(3),
  ]);

  const heroStats = snapshot.metrics.filter((m) => ["trained", "mentors", "generations", "challenges"].includes(m.id));

  return (
    <>
      <Hero stats={heroStats} />
      <About />
      <Initiatives />
      {program && <ResearcherProgram program={program} />}
      <Methodology steps={methodology.steps} skills={methodology.skills} />
      <Challenges challenges={challenges} />
      <Community activities={community.activities} gallery={community.gallery} events={events} />
      <Mentors mentors={mentors} />
      <Impact snapshot={snapshot} stories={stories} />
      <Alliances profiles={partnerProfiles} />
      <LabsPreview posts={posts} />
      <Participate paths={participationPaths} />
      <Contact />
    </>
  );
}
