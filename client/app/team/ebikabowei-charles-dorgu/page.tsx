import TejereLayout from "../../../components/TejereLayout";
import { PageHero, CtaBand } from "../../../components/TejereSections";
import { tejere } from "../../../src/data/tejere";

const member = tejere.team[2];

export default function EbikaboweiCharlesDorguPage() {
    return (
        <TejereLayout path="/about">
            <PageHero
                label="Our People"
                title={member.name}
                text={member.role}
            />
            <section className="section-pad">
                <div className="container profile-grid">
                    <aside className="profile-aside reveal">
                        <div className="profile-meta">
                            <div className="eyebrow">Role</div>
                            <p>{member.role}</p>
                        </div>
                        <div className="profile-meta">
                            <div className="eyebrow">Location</div>
                            <p>{member.location}</p>
                        </div>
                        <div className="profile-meta">
                            <div className="eyebrow">Qualifications</div>
                            <ul className="profile-list">
                                {member.qualifications.map((q) => (
                                    <li key={q}>{q}</li>
                                ))}
                            </ul>
                        </div>
                        <a href="/about#team" className="btn btn-dark" style={{ marginTop: 32 }}>
                            ← Back to team
                        </a>
                    </aside>

                    <div className="profile-body reveal">
                        <div className="eyebrow">Profile</div>
                        <h2>{member.name}{member.suffix ? `, ${member.suffix}` : ""}</h2>
                        <p className="profile-lead">{member.bio}</p>
                        <h3 className="profile-section-title">Areas of expertise</h3>
                        <ul className="profile-expertise">
                            {member.expertise.map((e) => (
                                <li key={e}>{e}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <CtaBand />
        </TejereLayout>
    );
}
