# Git Forensics - Evidence Proliferation Guide

This repository contains the source code for [gitforensics.org](https://gitforensics.org), a free guide on using Git for evidence preservation and documentation.

## About

Git Forensics teaches how to leverage Git's cryptographic and distributed properties for creating tamper-evident documentation. The guide covers workplace applications, protection strategies, and forensic techniques.

## Development

This is a static website built with vanilla HTML, CSS, and JavaScript.

## License

The book content is © 2025 Caia Tech. Free for personal, educational, and non-commercial use.

See the book's copyright notice for full terms.

## Contributing

Please use the ideas here to build amazing tools of the future.

## Author

Created by [Caia Tech](https://caiatech.com)


Git Forensics as the Solution----------------------------------------------------------------

  Real-Time AI Verification

  Every AI interaction automatically:
  - Creates cryptographic commits of all outputs
  - Generates distributed timestamps across multiple systems
  - Builds tamper-evident chains of conversation
  - Provides mathematical proof of authenticity

  Implementation Examples

  Medical AI Systems
  - Diagnosis and treatment recommendations Git-committed in real-time
  - Immutable patient interaction logs
  - Legally admissible evidence of AI medical advice

  Legal AI Assistants
  - Every legal opinion cryptographically signed
  - Timestamped advice that can't be retroactively altered
  - Protection for both lawyers and clients

  Financial AI Trading
  - Algorithmic decisions recorded immutably
  - Regulatory compliance through transparent audit trails
  - Proof of AI reasoning at time of trade

  Customer Service AI
  - Every promise or commitment permanently recorded
  - Protection against "we never said that" disputes
  - Corporate accountability for AI representatives

  The Network Effect

  When AI systems adopt Git Forensics:
  - Each AI output becomes independently verifiable
  - Multiple systems create interlocking verification
  - Tampering requires compromising entire networks
  - Truth becomes mathematically provable

  Beyond Individual Protection

  This isn't just about protecting users from AI deception. It's about:
  - Enabling AI systems to build trust through transparency
  - Creating legal frameworks for AI accountability
  - Establishing cryptographic standards for AI evidence
  - Building the verification backbone for the AI age

  Git Forensics transforms AI from a black box of deniable outputs into a transparent system of cryptographically verified truth. In an era where reality itself is under assault by synthetic media, this method provides the mathematical certainty courts, corporations, and citizens desperately need.

  ## Building Verification Networks

  Git Forensics becomes exponentially more powerful through verification networks - multiple independent parties who cannot collude to lie.

  **Example Network**:
  - Your organization commits evidence
  - Regulator nodes timestamp it
  - Competitor nodes verify (mutual watching)
  - Academic institutions archive
  - International bodies witness

  No single entity can forge consensus across hostile witnesses.

  **Applications**:
  - Financial markets (exchanges + regulators + competitors)
  - Healthcare (hospitals + insurers + oversight boards)
  - Supply chains (manufacturers + distributors + customs)
  - AI/ML systems (platforms + researchers + watchdogs)

  The principle: Truth emerges from parties who distrust each other but trust the math.

  ## A Note on Privacy: Encrypted Git Forensics

  Git Forensics works equally well with encrypted data. You can have both verification and privacy.

  **How it works**: Encrypt sensitive content, commit the encrypted blob + hash, distribute widely, selectively share decryption keys.

  **What's preserved**: Timestamps, tamper-evidence, distribution, and your control over disclosure.

  Perfect for: Healthcare records, trade secrets, legal documents, personal evidence.
----------------------------------------------------------------------------
  
Temporal + Git Forensics: The Next Evolution
Automated Evidence Collection with Immutable Workflow History

While Git forensics provides cryptographic proof of WHAT was documented and WHEN it was committed, Temporal adds another critical layer: HOW evidence was collected and processed.

Key Synergies:
1. Workflow History as Legal Evidence
* Every automated collection action is permanently recorded
* Timestamps for each step in the evidence gathering process
* Immutable audit trail of all workflow executions
* Proves evidence was collected contemporaneously, not fabricated later
2. Durable Execution for Continuous Documentation
* Workflows survive system failures, attacks, and interruptions
* Long-running workflows can document patterns over months/years
* Automatic retries with full history preservation
* Creates unbreakable chain of custody
3. Dynamic Response to Evolving Threats
// Example: Adaptive evidence collection
async function monitorAndDocument() {
  while (true) {
    const threat = await detectNewThreat();
    // Dynamically spawn appropriate documentation workflow
    await startChild(`document${threat.type}Workflow`);
    // Commit findings to Git with cryptographic proof
    await commitToGitRepo(threat);
  }
}

4. Query System for Legal Discovery
* "Show all evidence collected between date X and Y"
* "Prove when this specific document was first observed"
* "Demonstrate the sequence of events leading to this commit"
* All queries return immutable, timestamped results
  
Why This Matters:
* Git proves the evidence is authentic
* Temporal proves the collection process was legitimate
* Together: Unassailable documentation system
* Courts can verify both the evidence AND the methodology

Use Cases:
* Automated monitoring of changing documents/databases
* Real-time documentation of ongoing violations
* Proof of contemporaneous evidence collection
* Protection against claims of fabrication or backdating
The combination creates a legally robust system where every piece of evidence has both cryptographic verification (Git) and process verification (Temporal).

Note: Temporal is open source and can be self-hosted, maintaining the same independence principles as Git forensics.


---

*"This developer flies solo"* 🛩️
