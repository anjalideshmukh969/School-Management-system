import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";

const SchoolProfile = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [facilityInput, setFacilityInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    api.get("/school-info").then(({ data }) => setForm(data));
  }, []);

  if (!form) return <DashboardLayout title="School Profile"><p className="text-gray-500">Loading...</p></DashboardLayout>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addFacility = () => {
    if (!facilityInput.trim()) return;
    setForm({ ...form, facilities: [...(form.facilities || []), facilityInput.trim()] });
    setFacilityInput("");
  };
  const removeFacility = (i) => setForm({ ...form, facilities: form.facilities.filter((_, idx) => idx !== i) });

  const addGalleryImage = () => {
    if (!galleryInput.trim()) return;
    setForm({ ...form, galleryImages: [...(form.galleryImages || []), galleryInput.trim()] });
    setGalleryInput("");
  };
  const removeGalleryImage = (i) => setForm({ ...form, galleryImages: form.galleryImages.filter((_, idx) => idx !== i) });

  const addAchievement = () => {
    if (!achievementInput.trim()) return;
    setForm({ ...form, achievements: [...(form.achievements || []), achievementInput.trim()] });
    setAchievementInput("");
  };
  const removeAchievement = (i) => setForm({ ...form, achievements: form.achievements.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.put("/school-info", form);
      setMessage("School profile updated. Check the public About page to see it live.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="School Profile (Public About Page)">
      <p className="text-gray-500 text-sm mb-6">
        This information appears on the public About page (visible to visitors before they log in).
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">School Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Tagline</label>
            <input name="tagline" value={form.tagline} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Established Year</label>
            <input name="establishedYear" type="number" value={form.establishedYear} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">UDISE Code</label>
            <input name="udiseCode" value={form.udiseCode} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Affiliation Board</label>
            <input name="affiliation" value={form.affiliation} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Principal Name</label>
            <input name="principalName" value={form.principalName} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Hero Photo URL</label>
          <input name="heroImageUrl" value={form.heroImageUrl || ""} onChange={handleChange} placeholder="https://... (link to a photo of your school building)" className="input" />
          <p className="text-xs text-gray-400 mt-1">Paste a link to a hosted photo (e.g. from your school's own site or cloud storage). Leave blank to show a placeholder.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">About the School</label>
          <textarea name="about" rows={4} value={form.about} onChange={handleChange} className="input" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Principal's Message</label>
          <textarea name="principalMessage" rows={3} value={form.principalMessage} onChange={handleChange} className="input" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Student Strength</label>
            <input name="studentStrength" type="number" value={form.studentStrength} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Facilities</label>
          <div className="flex gap-2 mb-2">
            <input value={facilityInput} onChange={(e) => setFacilityInput(e.target.value)} placeholder="e.g. Computer Lab" className="input" />
            <button type="button" onClick={addFacility} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 rounded-lg">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.facilities || []).map((f, i) => (
              <span key={i} className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full flex items-center gap-2">
                {f} <button onClick={() => removeFacility(i)} className="text-primary-400 hover:text-primary-700">×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Achievements</label>
          <div className="flex gap-2 mb-2">
            <input value={achievementInput} onChange={(e) => setAchievementInput(e.target.value)} placeholder="e.g. State Science Fair Winners 2025" className="input" />
            <button type="button" onClick={addAchievement} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 rounded-lg">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.achievements || []).map((a, i) => (
              <span key={i} className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full flex items-center gap-2">
                {a} <button onClick={() => removeAchievement(i)} className="text-amber-400 hover:text-amber-700">×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Gallery Photo URLs</label>
          <div className="flex gap-2 mb-2">
            <input value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} placeholder="Paste photo URL and press Add" className="input" />
            <button type="button" onClick={addGalleryImage} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 rounded-lg">Add</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {(form.galleryImages || []).map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                <button onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-white/90 rounded-full w-5 h-5 text-xs text-red-600 opacity-0 group-hover:opacity-100">×</button>
              </div>
            ))}
          </div>
        </div>

        {message && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">{message}</p>}

        <button onClick={handleSave} disabled={saving} className="bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-lg">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default SchoolProfile;
