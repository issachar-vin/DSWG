export default function CockpitHud() {
  return (
    <div className="cockpit" aria-hidden="true">
      <div className="cockpit-vignette" />
      <div className="cockpit-scanlines" />
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
      <div className="hud-readout top-left">GUILD NAVCOM · ARRAKIS ORBIT</div>
      <div className="hud-readout top-right">SIG ▮▮▮▮▯ · LINK STABLE</div>
      <div className="hud-readout bottom-left">
        <span className="hud-pulse" />
        SPICE FLOW NOMINAL
      </div>
      <div className="hud-readout bottom-right">CHOAM UPLINK 88.4%</div>
    </div>
  );
}
