import PageHeader from "@/components/PageHeader";
import YogaPoseCard from "@/components/YogaPoseCard";
import FloatingChatButton from "@/components/FloatingChatButton";
import { useNavigate } from "react-router-dom";

const yogaPoses = [
  {
    id: 1,
    title: "Pose braços de águia",
    description: "Uma pose que fortalece os braços e melhora o equilíbrio...",
    completed: true,
  },
  {
    id: 2,
    title: "Pose ave do paraíso",
    description: "Pose avançada que trabalha flexibilidade e força...",
    completed: false,
  },
];

const YogaList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Yoga" backPath="/home" />
      
      <main className="px-5 py-6 space-y-4 max-w-2xl mx-auto">
        {yogaPoses.map((pose) => (
          <YogaPoseCard
            key={pose.id}
            title={pose.title}
            description={pose.description}
            completed={pose.completed}
            onClick={() => navigate(`/yoga/${pose.id}`)}
          />
        ))}
      </main>

      <FloatingChatButton />
    </div>
  );
};

export default YogaList;
