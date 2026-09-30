# Threat-to-Control Mapping

The following table dictates how each identified threat is mitigated within the DevSecOps pipeline and application codebase.

| Threat ID | Threat Description | Mitigating Control | Codebase / Pipeline Location |
| :--- | :--- | :--- | :--- |
| **T1** | IDOR in Allocations | **Server-Side Session Validation:** Remove reliance on URL parameters. Extract the `userId` directly from the secure, HTTP-only `req.session` object. | `app/routes/allocations.js` |
| **T2** | NoSQL Injection | **Strict Type Casting:** Replace string concatenation in the `$where` clause with strict `parseInt()` casting and boundary checks to ensure input is evaluated only as a mathematical integer. | `app/data/allocations-dao.js` |
| **T3** | ReDoS via Routing Regex | **Linear Regex Evaluation:** Remove the redundant outer nested quantifier (`+`) from the regex to eliminate the possibility of exponential backtracking. | `app/routes/profile.js` |
| **T4** | SSJS Injection (RCE) | **Safe Parsing Functions:** Completely remove the dangerous `eval()` function and replace it with `parseInt()` for secure mathematical conversion. | `app/routes/contributions.js` |