import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { usePartners } from "../contexts/PartnerContext";

const Schedule = () => {
  const { partners } = usePartners();
  const [meetings, setMeetings] = useState([
    { id: 1, partnerId: 1, partnerName: "Acme Inc", date: new Date(2024, 2, 15) },
    { id: 2, partnerId: 2, partnerName: "TechCorp", date: new Date(2024, 2, 20) },
  ]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: meetings.length + 1 }]);
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <AddMeetingDialog partners={partners} onAddMeeting={addMeeting} />
      </div>
      <div className="space-y-4">
        {meetings.sort((a, b) => a.date - b.date).map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} onDelete={deleteMeeting} />
        ))}
      </div>
    </div>
  );
};

const MeetingCard = ({ meeting, onDelete }) => (
  <Card>
    <CardHeader>
      <CardTitle>{meeting.partnerName}</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between items-center">
      <div>
        <p><strong>Date:</strong> {format(meeting.date, "MMMM d, yyyy")}</p>
      </div>
      <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => onDelete(meeting.id)}>Delete</Button>
    </CardContent>
  </Card>
);

const AddMeetingDialog = ({ partners, onAddMeeting }) => {
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = () => {
    const partner = partners.find(p => p.id.toString() === selectedPartner);
    if (partner && selectedDate) {
      onAddMeeting({
        partnerId: partner.id,
        partnerName: partner.name,
        date: selectedDate,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Schedule Meeting</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="partner">Partner</Label>
            <Select onValueChange={setSelectedPartner}>
              <SelectTrigger>
                <SelectValue placeholder="Select a partner" />
              </SelectTrigger>
              <SelectContent>
                {partners.map(partner => (
                  <SelectItem key={partner.id} value={partner.id.toString()}>{partner.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">Add Meeting</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Schedule;