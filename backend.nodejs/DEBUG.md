# Debugging Guide for Node.js Express TypeScript

This guide covers different methods to debug your Node.js Express TypeScript application.

## Method 1: VS Code Debugging (Recommended)

### Setup
1. Open your project in VS Code
2. Go to the Debug panel (Ctrl+Shift+D)
3. Select one of the debug configurations:
   - **Debug Express App**: Direct debugging with ts-node
   - **Debug with Nodemon**: Debugging with auto-restart
   - **Attach to Process**: Attach to an already running process

### How to Use
1. Set breakpoints in your TypeScript files
2. Press F5 or click the green play button
3. The debugger will stop at your breakpoints
4. Use the debug console to evaluate expressions

### Debug Console Commands
```javascript
// Inspect variables
console.log(user);

// Evaluate expressions
user.email

// Check the call stack
// Use the call stack panel in VS Code
```

## Method 2: Command Line Debugging

### Start with Inspector
```bash
npm run debug
```
This starts the app with Node.js inspector enabled on port 9229.

### Start with Break on First Line
```bash
npm run debug:brk
```
This starts the app and breaks on the first line of code.

### Debug with Nodemon
```bash
npm run debug:nodemon
```
This starts the app with nodemon and inspector enabled.

## Method 3: Chrome DevTools

1. Start the app with inspector:
   ```bash
   npm run debug
   ```

2. Open Chrome and navigate to: `chrome://inspect`

3. Click on "Open dedicated DevTools for Node"

4. You can now debug in Chrome DevTools with full source map support

## Method 4: Attach to Running Process

1. Start your app normally:
   ```bash
   npm run dev
   ```

2. In VS Code, use the "Attach to Process" configuration

3. The debugger will attach to the running process

## Debugging Tips

### Setting Breakpoints
- Click in the gutter next to line numbers in VS Code
- Use `debugger;` statement in your code
- Set conditional breakpoints by right-clicking on a breakpoint

### Useful Debug Commands
```javascript
// In debug console
typeof user
Object.keys(user)
JSON.stringify(user, null, 2)
```

### Environment Variables
The debug configurations include:
- `NODE_ENV=development`
- Source maps enabled
- TypeScript path mapping support

### Common Issues

1. **Source maps not working**: Ensure `sourceMap: true` in tsconfig.json
2. **Path mapping issues**: Verify tsconfig-paths is properly configured
3. **Hot reload not working**: Use the "Debug with Nodemon" configuration

## Advanced Debugging

### Debugging Async Code
```typescript
// Set breakpoints in async functions
public async authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
    // Set breakpoint here
    const user = await UserRepository.findOne({
        email: credentials.email,
    }).select("+password");
    
    // And here
    if (!user || !user.isEnable) {
        throw new Error("Invalid email or password");
    }
}
```

### Debugging Express Middleware
```typescript
// Add debugger statements in middleware
app.use((req, res, next) => {
    debugger; // This will pause execution
    console.log(`${req.method} ${req.path}`);
    next();
});
```

### Debugging Database Queries
```typescript
// In your auth service
public async register(registerData: RegisterData): Promise<AuthResponse> {
    debugger; // Pause here to inspect registerData
    
    const existingUser = await UserRepository.findOne({
        email: registerData.email,
    });
    
    debugger; // Pause here to inspect existingUser
    
    if (existingUser) {
        throw new Error("Email already exists");
    }
}
```

## Troubleshooting

### Debugger Won't Connect
1. Check if port 9229 is available
2. Ensure no firewall is blocking the port
3. Try a different port in launch.json

### Source Maps Not Working
1. Verify `sourceMap: true` in tsconfig.json
2. Check that outFiles path is correct in launch.json
3. Ensure TypeScript compilation is working

### TypeScript Paths Not Resolving
1. Verify tsconfig-paths is installed
2. Check that paths in tsconfig.json are correct
3. Ensure the --require flag includes tsconfig-paths/register 