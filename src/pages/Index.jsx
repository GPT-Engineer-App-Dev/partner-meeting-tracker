import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Our Site</h1>
      <p className="text-lg">Here are some blue buttons for you:</p>
      <div className="space-x-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Click Me
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Press Me
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Tap Me
        </Button>
      </div>
    </div>
  );
};

export default Index;