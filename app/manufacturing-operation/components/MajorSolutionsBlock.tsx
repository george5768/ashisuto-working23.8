'use client';

export default function MajorSolutionsBlock() {
  return (
    <section className="bg-muted px-6 md:px-16 pb-20 text-foreground">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center pt-5">Major Solutions Include</h2>

        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-primary">Advance Planning & Scheduling (APS)</h3>
          <p className="text-muted-foreground">
            APS is an integrated supply planning solution that covers the entire production planning area
            by unifying the capabilities of conventional production planning systems.
          </p>

          <div className="border-l-4 border-primary pl-6 mt-4 space-y-2">
            <p className="font-medium">Consists of 4 key modules:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>
                <strong>Master Production Schedule (MPS):</strong> Plan the production schedule and quantity.
              </li>
              <li>
                <strong>Capacity Requirements Planning (CRP):</strong> Plan equipment and human capacity
                required for manufacturing.
              </li>
              <li>
                <strong>Finite Capacity Scheduling (FCS):</strong> Plan the production sequence of products and parts.
              </li>
              <li>
                <strong>Material Requirements Planning (MRP):</strong> Plan the quantity of necessary materials and parts.
              </li>
            </ul>
          </div>
        </div>

        {/* CMMS Block */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-primary">Computerized Maintenance Management System (CMMS)</h3>
          <p className="text-muted-foreground">
            CMMS flexibly adapts to a wide range of asset maintenance tasks — from scheduling to tracking equipment performance and ensuring uptime across operations.
          </p>
        </div>

        {/* IoT Devices */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-primary">PLC IoT Devices and More</h3>
          <p className="text-muted-foreground">
            Expand system capabilities with real-time data collection from IoT-connected PLC devices — enabling predictive maintenance, smarter insights, and process automation.
          </p>
        </div>
      </div>
    </section>
  );
}
