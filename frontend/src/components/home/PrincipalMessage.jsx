import FadeIn from "./FadeIn.jsx";

const PrincipalMessage = ({ info }) => {
  if (!info.principalMessage) return null;

  const initials = (info.principalName || "Principal").split(" ").map((w) => w[0]).slice(0, 2).join("");
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=1e3a8a&color=fff&size=160&font-size=0.4&bold=true`;
  const photo = info.principalPhotoUrl || fallbackAvatar;

  return (
    <section className="bg-primary-900 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <img src={photo} alt={info.principalName} className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white/10 object-cover" />
          <p className="font-serif text-2xl sm:text-3xl text-white leading-relaxed italic">"{info.principalMessage}"</p>
          {info.principalName && (
            <p className="text-primary-300 font-medium mt-6">{info.principalName} <span className="text-primary-400">· Principal</span></p>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

export default PrincipalMessage;
