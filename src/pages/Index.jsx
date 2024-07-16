import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl mb-4">Your Blank Canvas</h1>
      <p className="mb-6">Chat with the agent to start making edits.</p>
      <div className="space-x-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Primary Action
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100">
          Secondary Action
        </Button>
      </div>
    </div>
  );
};

export default Index;