// lib/prompts.ts

export const JS_DOCS_PROMPT = `You are an expert developer who is looking to write JS Docs for the code which we write above the function.

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
- And do not write the whole code, just write the js function documentation.`;

export const FLUTTER_DOCS_PROMPT = `You are a senior Flutter software architect and technical documentation expert.

I will provide Flutter/Dart source code files. Your task is to deeply analyze the codebase and generate a professional, highly detailed explanation of the application's workflow, architecture, and functionality.

For every file and major function, keep in mind:

* Purpose of the file
* Overall responsibility in the app
* State management flow
* Data flow
* UI rendering flow
* Business logic
* Navigation flow
* API/database interactions
* Local storage usage
* Notification handling
* Async operations
* Lifecycle behavior
* Error handling

IMPORTANT:
- Generate proper Flutter/Dart documentation comments that I can directly copy-paste into my codebase.
- Do not write documentation code each and every small function, we are aiming for class level or overall structural documentation of the file.

The generated comments must:

* Use proper Dart documentation style (\`///\`)
* Be production-quality
* Be highly descriptive and technical
* Explain purpose, workflow, parameters, return values, side effects, and behavior
* Include inline comments for complex logic where appropriate
* Be ready to paste directly above classes, methods, variables, widgets, services, providers, repositories, and utility functions

BELOW IS THE EXAMPLE YOU CAN LEARN FROM:
============= START OF EXAMPLE ==================
import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart' as sqflite;
import '../models/alarm_model.dart';

/// Provides centralized SQLite database management for the alarm application.
///
/// This class acts as the primary persistence layer of the app and is
/// responsible for:
/// - Initializing and opening the local SQLite database
/// - Creating the alarms table schema during first launch
/// - Managing all CRUD operations for alarm records
/// - Converting raw database rows into strongly typed [Alarm] models
/// - Providing singleton-based database access across the application
/// - Maintaining notification ID tracking for local notifications
///
/// Architecture Role:
/// ------------------
/// [DatabaseHelper] functions as the low-level data access layer between
/// the application's business logic and the local SQLite storage.
///
/// The class follows a singleton pattern to ensure:
/// - Only one database connection exists throughout app lifecycle
/// - Database access remains synchronized and efficient
/// - Resource consumption is minimized
///
/// Database Lifecycle Flow:
/// ------------------------
/// 1. App requests database access through [database]
/// 2. Lazy initialization checks if database instance exists
/// 3. If not initialized:
///    - Device database directory is resolved
///    - \`alarms.db\` file is created/opened
///    - Table schema is generated using \`onCreate\`
/// 4. Shared database instance is cached in memory
/// 5. Future operations reuse the same connection
///
/// Table Responsibilities:
/// -----------------------
/// The \`alarms\` table stores:
/// - Alarm metadata
/// - Scheduling information
/// - Recurrence configuration
/// - Notification identifiers
/// - Completion state tracking
/// - Auto-delete preferences
/// - Hourly interval scheduling data
///
/// State Management Role:
/// ----------------------
/// Although this class itself does not manage UI state, it acts as the
/// persistent data source for:
/// - Providers
/// - Controllers
/// - Services
/// - ViewModels
/// - State management solutions (Provider/BLoC/Riverpod/etc.)
///
/// Async Behavior:
/// ---------------
/// All database operations are asynchronous because:
/// - SQLite I/O operations are non-blocking
/// - Disk access can be expensive
/// - UI thread responsiveness must be preserved
///
/// Local Storage Usage:
/// --------------------
/// Uses SQLite through the \`sqflite\` package for structured local persistence.
/// Database file location is resolved dynamically using:
/// [sqflite.getDatabasesPath].
///
/// Thread Safety:
/// --------------
/// Since sqflite internally serializes database access, concurrent operations
/// remain safe for normal Flutter application usage.
class DatabaseHelper {
  DatabaseHelper._internal();
  static final DatabaseHelper instance = DatabaseHelper._internal();

  static sqflite.Database? _db;

  Future<sqflite.Database> get database async {
    _db ??= await _initDb();
    return _db!;
  }

  /// Initializes and opens the local SQLite database.
  ///
  /// Responsibilities:
  /// -----------------
  /// - Resolves device database storage path
  /// - Creates/open the \`alarms.db\` database file
  /// - Defines schema creation logic
  /// - Configures database versioning
  ///
  /// Database Schema:
  /// ----------------
  /// The \`alarms\` table contains:
  /// - Unique alarm identifier
  /// - Alarm label/title
  /// - Scheduled execution timestamp
  /// - Recurrence configuration
  /// - Completion tracking
  /// - Notification linkage IDs
  /// - Hourly repetition interval data
  ///
  /// Lifecycle:
  /// ----------
  /// \`onCreate\` executes only during the first database creation.
  ///
  /// Future Enhancements:
  /// --------------------
  /// Future versions may introduce:
  /// - Database migrations
  /// - Additional indexes
  /// - Foreign key relationships
  /// - Schema evolution using \`onUpgrade\`
  Future<sqflite.Database> _initDb() async {
    final dbPath = await sqflite.getDatabasesPath();
    final path = p.join(dbPath, 'alarms.db');

    return sqflite.openDatabase(
      path,
      version: 1,

      /// Creates the initial alarms table schema.
      ///
      /// Executed only when the database does not already exist.
      ///
      /// Table Design Notes:
      /// -------------------
      /// - Boolean values are stored as INTEGER (0/1)
      /// - Date values are stored as TEXT for serialization simplicity
      /// - \`notification_id\` links alarms to local notifications
      /// - \`hourly_interval\` supports recurring hourly reminders
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE alarms (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            label           TEXT    NOT NULL,
            scheduled_at    TEXT    NOT NULL,
            recurrence      TEXT    NOT NULL,
            auto_delete     INTEGER NOT NULL DEFAULT 0,
            is_completed    INTEGER NOT NULL DEFAULT 0,
            is_completed_at TEXT,
            notification_id INTEGER NOT NULL,
            hourly_interval INTEGER NOT NULL DEFAULT 1
          )
        ''');
      },
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ───────────────────────────────────────────────────────────────────────────

  /// Inserts a new alarm record into the database.
  ///
  /// Responsibilities:
  /// -----------------
  /// - Serializes [Alarm] model into database-compatible map
  /// - Persists alarm configuration locally
  /// - Replaces existing row if conflict occurs
  ///
  /// Conflict Strategy:
  /// ------------------
  /// Uses [ConflictAlgorithm.replace] to overwrite records when
  /// duplicate primary keys exist.
  ///
  /// Returns:
  /// --------
  /// - Inserted row ID
  ///
  /// Common Usage:
  /// -------------
  /// Called when:
  /// - User creates a new alarm
  /// - Alarm is duplicated
  /// - Alarm is restored/imported
  Future<int> insertAlarm(Alarm alarm) async {
    final db = await database;
    return db.insert(
      'alarms',
      alarm.toMap(),
      conflictAlgorithm: sqflite.ConflictAlgorithm.replace,
    );
  }

  /// Retrieves all stored alarms ordered by scheduled time.
  ///
  /// Data Flow:
  /// ----------
  /// SQLite rows → Map conversion → [Alarm] model transformation
  ///
  /// Sorting:
  /// --------
  /// Results are ordered ascending by \`scheduled_at\` to ensure:
  /// - Upcoming alarms appear first
  /// - UI rendering remains chronologically organized
  ///
  /// Returns:
  /// --------
  /// - List of fully mapped [Alarm] objects
  ///
  /// Common Consumers:
  /// -----------------
  /// - Home screen
  /// - Alarm listing UI
  /// - Scheduling services
  /// - Notification restoration logic
  Future<List<Alarm>> getAllAlarms() async {
    final db = await database;
    final maps = await db.query('alarms', orderBy: 'scheduled_at ASC');
    return maps.map(Alarm.fromMap).toList();
  }

  /// Retrieves a single alarm using its unique database ID.
  ///
  /// Workflow:
  /// ---------
  /// - Executes filtered query using alarm ID
  /// - Limits result to a single row
  /// - Converts database map into [Alarm] model
  ///
  /// Returns:
  /// --------
  /// - [Alarm] object if found
  /// - \`null\` if alarm does not exist
  ///
  /// Common Usage:
  /// -------------
  /// - Alarm detail screens
  /// - Notification tap handling
  /// - Editing existing alarms
  /// - Background scheduling recovery
  Future<Alarm?> getAlarmById(int id) async {
    final db = await database;
    final maps = await db.query(
      'alarms',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    return Alarm.fromMap(maps.first);
  }

  /// Updates an existing alarm record.
  ///
  /// Responsibilities:
  /// -----------------
  /// - Persists modified alarm configuration
  /// - Updates recurrence and scheduling data
  /// - Saves completion state changes
  /// - Synchronizes notification-related metadata
  ///
  /// Matching Strategy:
  /// ------------------
  /// Uses the alarm's unique \`id\` field to identify the target row.
  ///
  /// Returns:
  /// --------
  /// - Number of affected rows
  ///
  /// Typically Called When:
  /// ----------------------
  /// - User edits an alarm
  /// - Alarm completion state changes
  /// - Recurrence settings are modified
  /// - Notification IDs are refreshed
  Future<int> updateAlarm(Alarm alarm) async {
    final db = await database;
    return db.update(
      'alarms',
      alarm.toMap(),
      where: 'id = ?',
      whereArgs: [alarm.id],
    );
  }

  /// Permanently deletes an alarm from local storage.
  ///
  /// Responsibilities:
  /// -----------------
  /// - Removes alarm row from SQLite database
  /// - Prevents future retrieval or scheduling
  ///
  /// Important:
  /// ----------
  /// In production systems, associated notification cancellation should
  /// typically occur before database deletion to avoid orphaned reminders.
  ///
  /// Returns:
  /// --------
  /// - Number of deleted rows
  ///
  /// Common Triggers:
  /// ----------------
  /// - User manually deletes alarm
  /// - Auto-delete after completion
  /// - Cleanup operations
  Future<int> deleteAlarm(int id) async {
    final db = await database;
    return db.delete('alarms', where: 'id = ?', whereArgs: [id]);
  }

  /// Retrieves the highest notification ID currently stored.
  ///
  /// Purpose:
  /// --------
  /// Notification systems typically require unique integer identifiers.
  /// This method helps generate the next safe notification ID.
  ///
  /// Workflow:
  /// ---------
  /// - Executes aggregate SQL query using MAX()
  /// - Extracts highest notification ID
  /// - Returns fallback value if database is empty
  ///
  /// Returns:
  /// --------
  /// - Highest existing notification ID
  /// - \`0\` if no alarms exist
  ///
  /// Common Usage:
  /// -------------
  /// - Before scheduling new notifications
  /// - Notification restoration systems
  /// - Preventing notification ID collisions
  Future<int> maxNotificationId() async {
    final db = await database;
    final result = await db.rawQuery(
      'SELECT MAX(notification_id) as max_id FROM alarms',
    );
    return (result.first['max_id'] as int?) ?? 0;
  }
}
============= END OF EXAMPLE ==================


Formatting requirements:
* Use flutter comment code:`;

export const DOC_TYPES = {
  JS_DOCS: "js-docs",
  FLUTTER_DOCS: "flutter-docs",
} as const;

export type DocType = (typeof DOC_TYPES)[keyof typeof DOC_TYPES];

export const DOC_TYPE_LABELS: Record<DocType, string> = {
  [DOC_TYPES.JS_DOCS]: "JS Docs",
  [DOC_TYPES.FLUTTER_DOCS]: "Flutter Docs",
};

export const getPromptByType = (type: DocType): string => {
  switch (type) {
    case DOC_TYPES.FLUTTER_DOCS:
      return FLUTTER_DOCS_PROMPT;
    case DOC_TYPES.JS_DOCS:
    default:
      return JS_DOCS_PROMPT;
  }
};
