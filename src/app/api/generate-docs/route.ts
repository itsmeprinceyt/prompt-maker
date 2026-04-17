import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const basePrompt = `You are an expert developer who is looking to write JS Docs for the code which we write above the function.

Generate clean and professional documentation for the given code.
        
Example:
        /**
         * Creates a new manual booking with agreement and invoice PDF generation
         *
         * @async
         * @function POST
         * @description Creates a complete manual booking record, generates agreement and invoice PDFs,
         *              uploads signatures and documents, and triggers email notifications to user and admin.
         *
         * @param {Request} req - The incoming HTTP request with multipart form data
         *
         * @formdata {string} dateTime - Booking creation date and time
         * @formdata {string} city - City where booking takes place
         * @formdata {string} cityCode - Short code for agreement ID generation (max 5 chars)
         * @formdata {string} ownerName - Full name of vehicle owner
         * @formdata {string} ownerAddress - Complete address of owner
         * @formdata {string} [ownerAadhaar] - Owner's 12-digit Aadhaar number
         * @formdata {string} [ownerDrivingLicense] - Owner's driving license number (8-16 chars)
         * @formdata {string} renterDetails - Renter's full name/description
         * @formdata {string} renterAddress - Renter's complete address
         * @formdata {string} renterAadhaar - Renter's 12-digit Aadhaar number
         * @formdata {string} renterDrivingLicense - Renter's driving license number (8-16 chars)
         * @formdata {string} renterPhone - Renter's 10-digit mobile number
         * @formdata {string} witnessName - Witness's full name
         * @formdata {string} witnessPhone - Witness's 10-digit mobile number
         * @formdata {string} witnessAddress - Witness's complete address
         * @formdata {string} carMakeModel - Car make and model description
         * @formdata {string} registrationNumber - Vehicle registration number (format: MH01AB1234)
         * @formdata {string} chassisNumber - Vehicle chassis number (10-17 chars)
         * @formdata {string} engineNumber - Vehicle engine number (5-20 chars)
         * @formdata {string} vehicleColor - Color of the vehicle
         * @formdata {string} yearOfManufacturing - 4-digit manufacturing year
         * @formdata {string} startDateTime - Rental start date and time
         * @formdata {string} endDateTime - Rental end date and time
         * @formdata {string} userEmailId - Renter's email address for notifications
         * @formdata {string} collectedAmount - Rental amount collected (max 2 decimals)
         * @formdata {string} securityDeposit - Security deposit amount (max 2 decimals)
         * @formdata {File} [ownerSignature] - Owner's signature image file (max 20MB)
         * @formdata {File} [renterSignature] - Renter's signature image file (max 20MB)
         * @formdata {File} [witnessSignature] - Witness's signature image file (max 20MB)
         * @formdata {File} [renterAadharFront] - Renter Aadhaar front image (max 20MB)
         * @formdata {File} [renterAadharBack] - Renter Aadhaar back image (max 20MB)
         * @formdata {File} [renterDLFront] - Renter driving license front image (max 20MB)
         * @formdata {File} [renterDLBack] - Renter driving license back image (max 20MB)
         * @formdata {File} [witnessDocumentFront] - Witness document front image (max 20MB)
         * @formdata {File} [witnessDocumentBack] - Witness document back image (max 20MB)
         *
         * @returns {Promise<NextResponse>} JSON response with:
         *   - success: boolean indicating creation status
         *   - message: Status message
         *   - warning: Optional warning if PDF generation failed but booking created
         *
         * @throws {400} Validation error - Missing required fields or invalid format
         * @throws {401} Unauthorized - User not authenticated
         * @throws {401} No Admin/Mod access - User lacks required permissions
         * @throws {403} Account status check failed - User contact info not verified
         * @throws {500} Server error - Database or PDF generation error
         *
         * @description Workflow:
         *   1. Initialize server and database connection
         *   2. Authenticate user and validate admin/mod permissions
         *   3. Check account verification status
         *   4. Parse multipart form data and sanitize text fields
         *   5. Validate file sizes (max 20MB per file)
         *   6. Convert signature and document images to base64
         *   7. Validate all required fields are present
         *   8. Validate amounts (positive, max 2 decimals, within limits)
         *   9. Validate Aadhaar numbers (12 digits, starting 2-9)
         *   10. Validate phone numbers (10 digits, starting 6-9)
         *   11. Validate email format
         *   12. Validate driving license length (8-16 chars)
         *   13. Validate registration number format (2 letters + 2 digits + 2 letters + 4 digits)
         *   14. Validate chassis and engine number lengths
         *   15. Validate manufacturing year (between minimum and current year)
         *   16. Validate date/time ranges (end > start, max 30 days, min 1 hour)
         *   17. Generate unique booking ID and agreement reference ID
         *   18. Begin database transaction
         *   19. Insert booking record into manual_bookings table
         *   20. Log audit trail
         *   21. Commit transaction
         *   22. Generate agreement PDF with all signatures and documents
         *   23. Generate invoice PDF
         *   24. Check email notification toggles from global_values table
         *   25. Queue email jobs for user and admin if toggles are enabled
         *   26. Return success response with any warnings
         *   27. Rollback transaction and cleanup on error
         */
        export async function POST(req: Request): Promise<NextResponse> {


- The above js doc is the example in which you have to write the documentation for the code below.
- You just need to write the function, description, form/params, description/workflow. that is it.
- We do not need, any examples, or response return structure. just having:

        * @returns {Promise<NextResponse>} JSON response with:
        *   - success: boolean indicating creation status
        *   - message: Status message
        *   - warning: Optional warning if PDF generation failed but booking created
        *
        * @throws {400} Validation error - Missing required fields or invalid format
        * @throws {401} Unauthorized - User not authenticated
        * @throws {401} No Admin/Mod access - User lacks required permissions
        * @throws {403} Account status check failed - User contact info not verified
        * @throws {500} Server error - Database or PDF generation error
        
- This info is enough, but do not write examples or anything like that. ok? 

- If the code based below contains many different functions and write the js doc for each function in the same manner described above.
- And do not write the whole code, just write the js function documentation.
        `;

    const finalPrompt = `${basePrompt}
Do the above instructions for the code below:
    ${code}
    `;

    return NextResponse.json({ prompt: finalPrompt });
  } catch (err) {
    console.log(`Error occured: `, err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
