import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { usePartners } from "@/contexts/PartnerContext";

const DesignPartners = () => {
  const { partners, addPartner, updatePartner, deletePartner } = usePartners();
  const [editingPartner, setEditingPartner] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Design Partners</h1>
        <AddPartnerDialog onAddPartner={addPartner} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map(partner => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onEdit={(partner) => setEditingPartner(partner)}
            onDelete={deletePartner}
          />
        ))}
      </div>
      {editingPartner && (
        <EditPartnerDialog
          partner={editingPartner}
          onUpdatePartner={(updatedPartner) => {
            updatePartner(updatedPartner);
            setEditingPartner(null);
          }}
          onClose={() => setEditingPartner(null)}
        />
      )}
    </div>
  );
};

const PartnerCard = ({ partner, onEdit, onDelete }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={partner.avatar} alt={partner.name} />
          <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {partner.name}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p><strong>Email:</strong> {partner.email}</p>
      <p><strong>Phone:</strong> {partner.phone}</p>
      <p className="mt-2">{partner.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={() => onEdit(partner)}>Edit</Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the partner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(partner.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  </Card>
);

const PartnerForm = ({ partner, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(partner || { name: "", email: "", phone: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
};

const AddPartnerDialog = ({ onAddPartner }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Add New Partner</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Partner</DialogTitle>
      </DialogHeader>
      <PartnerForm onSubmit={onAddPartner} submitLabel="Add Partner" />
    </DialogContent>
  </Dialog>
);

const EditPartnerDialog = ({ partner, onUpdatePartner, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Partner</DialogTitle>
      </DialogHeader>
      <PartnerForm partner={partner} onSubmit={onUpdatePartner} submitLabel="Update Partner" />
    </DialogContent>
  </Dialog>
);

export default DesignPartners;